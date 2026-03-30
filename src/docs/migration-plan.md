# Plan: Incremental Stencil → Functional Component Migration

## Context

A previous attempt (`tm/refactor/qr-code-local-replacement`, commit `65f2d34`) migrated all ~41 components in one go. Visual testing revealed icons not rendering. This plan redoes the migration on a fresh branch from `main`, one component at a time, with a build + visual check after each.

**Root cause hypothesis for broken icons:** Icons with `shadow: true` had styles in their `.scss` via `:host { ... }` (the shadow root). After removing `@Component`, there's no shadow DOM, so `:host` rules become orphaned. The fix is to remove `:host` wrappers from icon SCSS and use direct class selectors — verifying each one renders correctly before moving on.

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
4. Update SCSS: remove `:host { ... }` wrapper, use direct class selectors (e.g., `.foo-icon { @apply mvx:w-4 mvx:h-4; }`)
5. Keep the SCSS file — if there are no non-`:host` rules, replace with the Tailwind trigger comment: `// This is needed to trigger the Stencil Tailwind compilation for inline Tailwind classes.`
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
| 3 | `mvx-magnifying-glass-icon` | `src/assets/icons/magnifying-glass-icon/magnifying-glass-icon.tsx` | |
| 4 | `mvx-spinner-icon` | `src/assets/icons/spinner-icon/spinner-icon.tsx` | |
| 5 | `mvx-shard-icon` | `src/assets/icons/shard-icon/shard-icon.tsx` | |
| 6 | `mvx-ledger-icon` | `src/assets/icons/ledger-icon/ledger-icon.tsx` | |
| 7 | `mvx-ledger-provider-icon` | `src/assets/icons/ledger-provider-icon/ledger-provider-icon.tsx` | |
| 8 | `mvx-multiversx-logo-icon` | `src/assets/icons/multiversx-logo-icon/multiversx-logo-icon.tsx` | |
| 9 | `mvx-multiversx-symbol-icon` | `src/assets/icons/multiversx-symbol-icon/multiversx-symbol-icon.tsx` | |
| 10 | `mvx-passkey-provider-icon` | `src/assets/icons/passkey-provider-icon/passkey-provider-icon.tsx` | |
| 11 | `mvx-wallet-provider-icon` | `src/assets/icons/wallet-provider-icon/wallet-provider-icon.tsx` | |
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
