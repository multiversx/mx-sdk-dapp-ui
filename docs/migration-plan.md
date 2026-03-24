# Migration Plan: Internal Web Components → Functional Components

## Context

Iulia has been refactoring internal Stencil web components into plain functional components to reduce the `dist/web-components` bundle size. This was confirmed by comparing builds: commit `96ccca55` (2.2MB) → `0db2a31a` (2.1MB).

Only components consumed externally by `mx-sdk-dapp`, `mx-wallet-dapp`, or `mx-template-dapp` should remain as exported web components. Everything else must become internal functions.

**Already done by Iulia (no action needed):**
- `SignTransactionsHeader`, `SignTransactionsAdvanced`, `SignTransactionsFooter`, `SignTransactionsOverview`
- `UnlockPanelFooter`, `UnlockPanelGroup`, `UnlockProviderButton`
- `SidePanel`, `SidePanelHeader`, `SidePanelSwiper`
- `TransactionListItem`

---

## Migration Pattern

**Before (Stencil @Component):**
```tsx
@Component({ tag: 'mvx-tooltip', styleUrl: 'tooltip.scss', shadow: true })
export class Tooltip {
  @Prop() position: 'top' | 'bottom' = 'top';
  render() { return <TooltipComponent position={this.position} />; }
}
```

**After (functional):**
```tsx
import { h } from '@stencil/core';
interface TooltipPropsType { position?: 'top' | 'bottom'; }
export function Tooltip({ position = 'top' }: TooltipPropsType) {
  return <TooltipComponent position={position} />;
}
```

**Steps for each migration:**
1. Remove `@Component` decorator and `tag`/`styleUrl`/`shadow` config
2. Remove Stencil decorators: `@Prop`, `@State`, `@Event`, `@Method`, `@Element`
3. Convert class + `render()` to a plain exported function with props interface
4. Keep `.scss` file — must contain the Tailwind comment (see `src/components/visual/tooltip/tooltip.scss`)
5. Update all parent component usages: replace `<mvx-xxx />` custom element tags with direct function imports `<Xxx />`
6. Run build, verify `components.d.ts` auto-updates and size reduces

---

## Group 1: Icon Components (24 components) — highest ROI

All located in `src/assets/icons/`. Simple SVG wrappers, no state or events.

| Component tag | File |
|---------------|------|
| `mvx-arc-extension-provider-icon` | `src/assets/icons/arc-extension-provider-icon/` |
| `mvx-arrow-right-icon` | `src/assets/icons/arrow-right-icon/` |
| `mvx-brave-extension-provider-icon` | `src/assets/icons/brave-extension-provider-icon/` |
| `mvx-circle-info-icon` | `src/assets/icons/circle-info-icon/` |
| `mvx-default-transaction-icon-large` | `src/assets/icons/default-transaction-icon-large/` |
| `mvx-default-transaction-icon-small` | `src/assets/icons/default-transaction-icon-small/` |
| `mvx-edge-extension-provider-icon` | `src/assets/icons/edge-extension-provider-icon/` |
| `mvx-extension-provider-icon` | `src/assets/icons/extension-provider-icon/` |
| `mvx-firefox-extension-provider-icon` | `src/assets/icons/firefox-extension-provider-icon/` |
| `mvx-ledger-icon` | `src/assets/icons/ledger-icon/` |
| `mvx-ledger-provider-icon` | `src/assets/icons/ledger-provider-icon/` |
| `mvx-magnifying-glass-icon` | `src/assets/icons/magnifying-glass-icon/` |
| `mvx-metamask-provider-icon` | `src/assets/icons/metamask-provider-icon/` |
| `mvx-multiversx-logo-icon` | `src/assets/icons/multiversx-logo-icon/` |
| `mvx-multiversx-symbol-icon` | `src/assets/icons/multiversx-symbol-icon/` |
| `mvx-passkey-provider-icon` | `src/assets/icons/passkey-provider-icon/` |
| `mvx-shard-icon` | `src/assets/icons/shard-icon/` |
| `mvx-spinner-icon` | `src/assets/icons/spinner-icon/` |
| `mvx-wallet-connect-app-gallery-icon` | `src/assets/icons/wallet-connect-app-gallery-icon/` |
| `mvx-wallet-connect-app-store-icon` | `src/assets/icons/wallet-connect-app-store-icon/` |
| `mvx-wallet-connect-google-play-icon` | `src/assets/icons/wallet-connect-google-play-icon/` |
| `mvx-wallet-provider-icon` | `src/assets/icons/wallet-provider-icon/` |
| `mvx-xportal-download-qr-icon` | `src/assets/icons/xportal-download-qr-icon/` |
| `mvx-xportal-qr-code-preloader` | `src/assets/icons/xportal-qr-code-preloader/` |

**Steps per icon:**
1. Open `<icon-name>.tsx`, remove `@Component`, convert class → function
2. Keep `.scss` file with Tailwind comment
3. Grep all parent usages of `<mvx-<icon-name>` → update to direct import

---

## Group 2: Toast Sub-components (8 components)

All internal to `mvx-toast-list` (which is kept). None consumed externally.

**Work inside-out (deepest nested first):**

| # | Component tag | File |
|---|---------------|------|
| 1 | `mvx-transaction-toast-details-body` | `src/components/functional/toasts-list/components/transaction-toast/components/transaction-toast-details/components/transaction-toast-details-body.tsx` |
| 2 | `mvx-transaction-toast-progress` | `.../transaction-toast/components/transaction-toast-progress/transaction-toast-progress.tsx` |
| 3 | `mvx-transaction-toast-content` | `.../transaction-toast/components/transaction-toast-content/transaction-toast-content.tsx` |
| 4 | `mvx-transaction-toast-details` | `.../transaction-toast/components/transaction-toast-details/transaction-toast-details.tsx` |
| 5 | `mvx-transaction-toast` | `.../toasts-list/components/transaction-toast/transaction-toast.tsx` |
| 6 | `mvx-simple-toast` | `.../custom-toast/components/simple-toast/simple-toast.tsx` |
| 7 | `mvx-generic-toast` | `.../custom-toast/generic-toast.tsx` |
| 8 | `mvx-custom-toast` | `.../custom-toast/components/custom-create-toast/custom-toast.tsx` |

**Steps:**
1. Convert `mvx-transaction-toast-details-body` → update usage in `transaction-toast-details.tsx`
2. Convert `mvx-transaction-toast-progress` → update usage in `transaction-toast-content.tsx`
3. Convert `mvx-transaction-toast-content` → update usage in `transaction-toast.tsx`
4. Convert `mvx-transaction-toast-details` → update usage in `transaction-toast.tsx`
5. Convert `mvx-transaction-toast` → update usage in `toast-list.tsx`
6. Convert `mvx-simple-toast` → update usage in `generic-toast.tsx`
7. Convert `mvx-generic-toast` → update usage in `custom-toast.tsx`
8. Convert `mvx-custom-toast` → update usage in `toast-list.tsx`

---

## Group 3: Wallet Connect Sub-components (2 components)

Internal to `mvx-wallet-connect` (which is kept).

| Component tag | File |
|---------------|------|
| `mvx-wallet-connect-download` | `src/components/functional/wallet-connect/components/wallet-connect-download/wallet-connect-download.tsx` |
| `mvx-wallet-connect-scan` | `src/components/functional/wallet-connect/components/wallet-connect-scan/wallet-connect-scan.tsx` |

**Steps:**
1. Convert `mvx-wallet-connect-download` → update usage in `wallet-connect.tsx`
2. Convert `mvx-wallet-connect-scan` → update usage in `wallet-connect.tsx`

---

## Group 4: Ledger Sub-components (2 components)

Internal to `mvx-ledger-connect` (which is kept).

| Component tag | File |
|---------------|------|
| `mvx-ledger-confirm` | `src/components/functional/ledger-connect/components/ledger-confirm/ledger-confirm.tsx` |
| `mvx-ledger-intro` | `src/components/functional/ledger-connect/components/ledger-intro/ledger-intro.tsx` |

**Steps:**
1. Convert `mvx-ledger-confirm` → update usage in `ledger-connect.tsx`
2. Convert `mvx-ledger-intro` → update usage in `ledger-connect.tsx`

---

## Group 5: Visual Utilities (5 components)

| # | Component tag | File |
|---|---------------|------|
| 1 | `mvx-pagination-ellipsis-form` | `src/components/visual/address-table/components/pagination/` |
| 2 | `mvx-pagination-ellipsis` | `src/components/visual/address-table/components/pagination/` |
| 3 | `mvx-pagination` | `src/components/visual/address-table/components/pagination/pagination.tsx` |
| 4 | `mvx-tooltip` | `src/components/visual/tooltip/tooltip.tsx` |
| 5 | `mvx-preloader` | `src/components/visual/preloader/preloader.tsx` |

**Steps (inside-out):**
1. Convert `mvx-pagination-ellipsis-form` → update usage in pagination
2. Convert `mvx-pagination-ellipsis` → update usage in pagination
3. Convert `mvx-pagination` → update usage in `address-table.tsx`
4. Convert `mvx-tooltip` → grep all usages across the codebase, update each
5. Convert `mvx-preloader` → grep all usages across the codebase, update each

---

## Files Affected Per Migration

For each component:
- `<component>.tsx` — main change (remove `@Component`, convert to function)
- `<component>.scss` — keep as-is with Tailwind comment
- Parent `.tsx` files — replace custom element tags with direct function imports
- `src/components.d.ts` — auto-regenerated on build (no manual edit needed)

---

## Verification

After each group:
```bash
npm run build
du -sh dist/web-components/
```

Baseline (at `0db2a31a`): `dist/web-components` = **2.1MB**

Expected: progressive reduction with each group. Largest drop expected from Group 1 (icons).
