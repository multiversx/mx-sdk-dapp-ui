# Plan: Incremental Stencil → Functional Component Migration

## Context

A previous attempt (`tm/refactor/qr-code-local-replacement`, commit `65f2d34`) migrated all ~41 components in one go. Visual testing revealed icons not rendering. This plan redoes the migration on a fresh branch from `main`, one component at a time, with a build + visual check after each.

**Root cause hypothesis for broken icons:** Icons with `shadow: true` had styles in their `.scss` via `:host { ... }` (the shadow root). After removing `@Component`, there's no shadow DOM, so `:host` rules become orphaned. The fix is to remove `:host` wrappers from icon SCSS and use direct class selectors — verifying each one renders correctly before moving on.

---

## SCSS + Shadow DOM Rule (learned from #3 magnifying-glass-icon)

Removing `@Component` also removes the `styleUrl` link — the SCSS file is no longer injected into any component. This has two consequences:

1. **Tailwind classes in SCSS won't apply inside shadow DOM parents.** Parent components with `shadow: true` (e.g. `mvx-address-table`) isolate their DOM — global CSS can't penetrate. Any Tailwind utilities previously in the icon's SCSS must move to the JSX class attribute directly, so Stencil includes them in the parent component's scoped styles at build time.

2. **Raw CSS values (non-Tailwind) must move to inline `style={{}}`** on the element. E.g. `fill: var(--mvx-neutral-500)` in SCSS → `style={{ fill: 'var(--mvx-neutral-500)' }}` on the SVG.

### Why Tailwind classes fail inside shadow DOM (confirmed with #3)

Even when Tailwind classes like `mvx:w-3 mvx:h-3` ARE present on the element (verified in DevTools), their CSS rules live in the **global stylesheet**. The `@Component { styleUrl }` → SCSS → Stencil Tailwind plugin chain was what injected those rules into the component's scoped shadow DOM styles. Without `@Component`, that chain is broken — the trigger comment in the SCSS has no effect.

Result: inside a shadow DOM parent (e.g. `mvx-address-table`), Tailwind class names on the SVG are inert. The computed size stays at whatever the flex container imposes, not what Tailwind specifies.

**Rule: all intrinsic icon styles must move to `style={{}}`** — inline styles always cross shadow DOM boundaries.

### Watch out for `:host` overrides of parent-passed classes

Some icons used `:host { @apply mvx:p-0!; }` to cancel classes passed by the parent. Removing the shadow DOM means those parent-passed classes now take effect on the SVG directly. Example from `magnifying-glass-icon` / `PaginationEllipsisForm`:

- Parent passed `mvx:p-[10px]` to the web component host
- `:host { @apply mvx:p-0!; }` silently killed it → production SVG had no padding
- After migration: `mvx:p-[10px]` reached the SVG + `mvx:box-content` → 32px instead of 12px

**Fix:** remove both the dead parent class (`mvx:p-[10px]`) and `mvx:box-content` from the icon JSX.

**Rule:** when removing `:host` rules, check each one — if it was overriding a parent-passed class, that class is now live and may need to be removed from the parent callsite too.

### Watch out for wrapper elements that depended on the web component's host size

When a web component host element had padding/size classes applied to it, its wrapper (e.g. a button div) relied on that size to maintain its own dimensions. After migration, the wrapper's content is the bare SVG (much smaller), which can cause the wrapper to collapse.

Example from `magnifying-glass-icon` / `PaginationEllipsisForm`:
- The button wrapper was absolutely positioned, sized by its content
- Production: button content was the `<mvx-magnifying-glass-icon>` host at ~30.5px wide (via `px-[10px]` padding on the host)
- After migration: button content is the 10.5px SVG → button collapses to 10.5px
- Fix: move `mvx:px-[10px] mvx:items-center mvx:justify-center` to the **wrapper div**, not the icon

**Rule:** this only applies when the wrapper's size depended on the web component host. Icons used inside already-sized flex rows (like `TransactionShards`) or slot content (like `mvx-tooltip`) are not affected.

### Correct migration pattern for icons (all intrinsic styles via inline style):
```tsx
// ALL icon-specific styles go in style={{}}, NOT as Tailwind classes:
<svg
  class={{ 'magnifying-glass-icon': true, [className]: Boolean(className) }}
  style={{
    width: '0.75rem',                    // replaces mvx:w-3 (= 10.5px at 14px root)
    height: '0.75rem',                   // replaces mvx:h-3
    fill: 'var(--mvx-neutral-500)',      // replaces fill: var(...) in SCSS
    transition: 'all 0.2s ease-in-out', // replaces mvx:transition-all etc.
    flexShrink: '0',
  }}
>
```

Tailwind classes passed via `className` prop from the **parent** still work — they are compiled into the parent component's shadow DOM styles. So parent-passed hover/color classes work fine.

The SCSS file is kept with only the trigger comment:
```scss
// This is needed to trigger the Stencil Tailwind compilation for inline Tailwind classes.
```

---

## Branch

`tm/refactor/components-to-functions`

---

## Migration Pattern

### Before (Stencil class component):
```tsx
@Component({ tag: 'mvx-foo-icon', styleUrl: 'foo-icon.scss', shadow: true })
export class FooIcon {
  @Prop() class?: string;
  render() {
    return <svg class={{ 'foo-icon': true, [this.class]: !!this.class }}>...</svg>;
  }
}
```

### After (Stencil functional component):
```tsx
import { h } from '@stencil/core';

interface FooIconPropsType {
  class?: string;
}

export function FooIcon({ class: className }: FooIconPropsType) {
  return <svg class={{ 'foo-icon': true, [className]: !!className }}>...</svg>;
}
```

### Steps per component:
1. Remove `@Component` decorator (tag, styleUrl, shadow)
2. Remove all Stencil decorators: `@Prop`, `@State`, `@Event`, `@Method`, `@Element`
3. Convert `export class Foo { render() { ... } }` → `export function Foo(props: FooPropsType) { ... }`
4. Move styles out of SCSS into JSX: Tailwind classes → class attribute, raw CSS values → `style={{}}`. Replace SCSS content with the Tailwind trigger comment.
5. SCSS file must always be kept with the trigger comment (even if empty of rules) — Stencil needs it to compile inline Tailwind classes.
6. Update all parent usages: replace `<mvx-foo-icon class={x} />` with `<FooIcon class={x} />` and add import
7. `npm run build` → verify visually → commit

### For non-icon components (with @Event, @State):
- `@Event() foo: EventEmitter` → `onFoo: () => void` prop (already named this way in usage)
- `@State() bar` → local module-level variable or passed-in state prop, depending on context
- `<Host>` → `<div>` or direct root element

---

## Components to Migrate (in order)

### Group 1: Icons (24) — migrate one at a time, visual check each

| # | Tag | File | Status |
|---|-----|------|--------|
| 1 | `mvx-arrow-right-icon` | `src/assets/icons/arrow-right-icon/arrow-right-icon.tsx` | ✅ done |
| 2 | `mvx-circle-info-icon` | `src/assets/icons/circle-info-icon/circle-info-icon.tsx` | ✅ done |
| 3 | `mvx-magnifying-glass-icon` | `src/assets/icons/magnifying-glass-icon/magnifying-glass-icon.tsx` | ✅ done |
| 4 | `mvx-spinner-icon` | `src/assets/icons/spinner-icon/spinner-icon.tsx` | ✅ done |
| 5 | `mvx-shard-icon` | `src/assets/icons/shard-icon/shard-icon.tsx` | ✅ done |
| 6 | `mvx-ledger-icon` | `src/assets/icons/ledger-icon/ledger-icon.tsx` | ✅ done |
| 7 | `mvx-ledger-provider-icon` | `src/assets/icons/ledger-provider-icon/ledger-provider-icon.tsx` | ✅ done |
| 8 | `mvx-multiversx-logo-icon` | `src/assets/icons/multiversx-logo-icon/multiversx-logo-icon.tsx` | ✅ done |
| 9 | `mvx-multiversx-symbol-icon` | `src/assets/icons/multiversx-symbol-icon/multiversx-symbol-icon.tsx` | ✅ done |
| 10 | `mvx-passkey-provider-icon` | `src/assets/icons/passkey-provider-icon/passkey-provider-icon.tsx` | ✅ done |
| 11 | `mvx-wallet-provider-icon` | `src/assets/icons/wallet-provider-icon/wallet-provider-icon.tsx` | ✅ done |
| 12 | `mvx-extension-provider-icon` | `src/assets/icons/extension-provider-icon/extension-provider-icon.tsx` | |
| 13 | `mvx-arc-extension-provider-icon` | `src/assets/icons/arc-extension-provider-icon/arc-extension-provider-icon.tsx` | |
| 14 | `mvx-brave-extension-provider-icon` | `src/assets/icons/brave-extension-provider-icon/brave-extension-provider-icon.tsx` | |
| 15 | `mvx-edge-extension-provider-icon` | `src/assets/icons/edge-extension-provider-icon/edge-extension-provider-icon.tsx` | |
| 16 | `mvx-firefox-extension-provider-icon` | `src/assets/icons/firefox-extension-provider-icon/firefox-extension-provider-icon.tsx` | |
| 17 | `mvx-metamask-provider-icon` | `src/assets/icons/metamask-provider-icon/metamask-provider-icon.tsx` | |
| 18 | `mvx-default-transaction-icon-large` | `src/assets/icons/default-transaction-icon-large/default-transaction-icon-large.tsx` | |
| 19 | `mvx-default-transaction-icon-small` | `src/assets/icons/default-transaction-icon-small/default-transaction-icon-small.tsx` | |
| 20 | `mvx-wallet-connect-app-gallery-icon` | `src/assets/icons/wallet-connect-app-gallery-icon/wallet-connect-app-gallery-icon.tsx` | |
| 21 | `mvx-wallet-connect-app-store-icon` | `src/assets/icons/wallet-connect-app-store-icon/wallet-connect-app-store-icon.tsx` | |
| 22 | `mvx-wallet-connect-google-play-icon` | `src/assets/icons/wallet-connect-google-play-icon/wallet-connect-google-play-icon.tsx` | |
| 23 | `mvx-xportal-download-qr-icon` | `src/assets/icons/xportal-download-qr-icon/xportal-download-qr-icon.tsx` | |
| 24 | `mvx-xportal-qr-code-preloader` | `src/assets/icons/xportal-qr-code-preloader/xportal-qr-code-preloader.tsx` | |

### Group 2: Toast Sub-components (8) — inside-out

| # | Tag | File | Status |
|---|-----|------|--------|
| 25 | `mvx-transaction-toast-details-body` | `src/components/functional/toasts-list/components/transaction-toast/components/transaction-toast-details/components/transaction-toast-details-body.tsx` | |
| 26 | `mvx-transaction-toast-progress` | `src/components/functional/toasts-list/components/transaction-toast/components/transaction-toast-progress/transaction-toast-progress.tsx` | |
| 27 | `mvx-transaction-toast-content` | `src/components/functional/toasts-list/components/transaction-toast/components/transaction-toast-content/transaction-toast-content.tsx` | |
| 28 | `mvx-transaction-toast-details` | `src/components/functional/toasts-list/components/transaction-toast/components/transaction-toast-details/transaction-toast-details.tsx` | |
| 29 | `mvx-transaction-toast` | `src/components/functional/toasts-list/components/transaction-toast/transaction-toast.tsx` | |
| 30 | `mvx-simple-toast` | `src/components/functional/toasts-list/components/custom-toast/components/simple-toast/simple-toast.tsx` | |
| 31 | `mvx-generic-toast` | `src/components/functional/toasts-list/components/custom-toast/generic-toast.tsx` | |
| 32 | `mvx-custom-toast` | `src/components/functional/toasts-list/components/custom-toast/components/custom-create-toast/custom-toast.tsx` | |

### Group 3: Wallet Connect Sub-components (2)

| # | Tag | File | Status |
|---|-----|------|--------|
| 33 | `mvx-wallet-connect-download` | `src/components/functional/wallet-connect/components/wallet-connect-download/wallet-connect-download.tsx` | |
| 34 | `mvx-wallet-connect-scan` | `src/components/functional/wallet-connect/components/wallet-connect-scan/wallet-connect-scan.tsx` | |

### Group 4: Ledger Sub-components (2)

| # | Tag | File | Status |
|---|-----|------|--------|
| 35 | `mvx-ledger-confirm` | `src/components/functional/ledger-connect/components/ledger-confirm/ledger-confirm.tsx` | |
| 36 | `mvx-ledger-intro` | `src/components/functional/ledger-connect/components/ledger-intro/ledger-intro.tsx` | |

### Group 5: Visual Utilities (5) — inside-out

| # | Tag | File | Status |
|---|-----|------|--------|
| 37 | `mvx-pagination-ellipsis-form` | `src/components/visual/address-table/components/pagination/PaginationEllipsisForm.tsx` | |
| 38 | `mvx-pagination-ellipsis` | `src/components/visual/address-table/components/pagination/PaginationEllipsis.tsx` | |
| 39 | `mvx-pagination` | `src/components/visual/address-table/components/pagination/pagination.tsx` | |
| 40 | `mvx-tooltip` | `src/components/visual/tooltip/tooltip.tsx` | |
| 41 | `mvx-preloader` | `src/components/visual/preloader/preloader.tsx` | |

---

## Known Issues from Previous Attempt

### Tooltip state management (components #27 and transactions-table)
When migrating `mvx-tooltip` (component #40) and replacing `<mvx-tooltip>` usages:
- The Stencil web component `mvx-tooltip` is **self-managing** (has internal `@State() isVisible`)
- The common `Tooltip` functional component is **controlled** (requires `isTooltipVisible` + `onVisibilityChange` props)
- In `transaction-toast-content.tsx` and `TransactionValue.tsx`, tooltip state must be lifted to the parent class component

### @State in converted components
`transaction-toast-details.tsx` uses module-level Maps to track expand/collapse state and force re-renders. This is a valid workaround for missing `@State` in functional components.

---

## Verification After Each Component

```bash
npm run build
# Then visually check in the app:
# - Group 1: Provider selection screen (icons visible?)
# - Group 2: Toast notifications appearing?
# - Group 3: WalletConnect QR flow working?
# - Group 4: Ledger connect flow working?
# - Group 5: Table pagination, tooltips, preloader visible?
```

After all groups:
```bash
du -sh dist/web-components/
# Baseline: 2.1MB — expect progressive reduction
```
