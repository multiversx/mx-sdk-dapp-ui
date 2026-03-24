# Migration Review: Functional Component Migration

## Status: Review Complete — 2 Fixes Required

Reviewed all 59 changed files from the functional component migration.

---

## 🔴 Issues Found — Must Fix

### Issue 1: Broken Tooltip in `TransactionValue.tsx`

**File:** `src/components/controlled/transactions-table/components/TransactionValue/TransactionValue.tsx`

**Problem:** Changed from `<mvx-tooltip>` (Stencil class with internal `@State() isVisible`) to `<Tooltip>` from `common/Tooltip/Tooltip`. The common `Tooltip` is a **controlled component** — it requires `isTooltipVisible` and `onVisibilityChange` props to function. Without them, `isTooltipVisible` defaults to `false` permanently and hovering does nothing. **Tooltip never shows.**

**Original:**
```tsx
<mvx-tooltip trigger={<Icon name="layers" class={styles.transactionValueIcon} />}>
  {value.titleText}
</mvx-tooltip>
```

**Current (broken):**
```tsx
<Tooltip trigger={<Icon name="layers" class={styles.transactionValueIcon} />}>{value.titleText}</Tooltip>
```

**Fix:** `TransactionValue` is a functional component rendered by `transactions-table.tsx` (a class component). Add `@State() isValueTooltipVisible: boolean = false` to `TransactionTable`, pass `isTooltipVisible` + `onVisibilityChange` down through `TransactionValue` props.

**Alternatively:** Since `TransactionValue` renders inside a loop over many rows, each row needs its own tooltip state. A simpler approach: add `isTooltipVisible` and `onVisibilityChange` as optional props to `TransactionValue`, and manage state in the parent `transactions-table.tsx` using a map keyed by row index/hash.

---

### Issue 2: Broken Tooltip in `transaction-toast-content.tsx`

**File:** `src/components/functional/toasts-list/components/transaction-toast/components/transaction-toast-content/transaction-toast-content.tsx`

**Problem:** Same as above. Changed from `<mvx-tooltip>` to `<Tooltip>` from common without providing visibility state.

**Original:**
```tsx
<mvx-tooltip position="bottom" trigger={<mvx-circle-info-icon />}>
  {amount.label}
</mvx-tooltip>
```

**Current (broken):**
```tsx
<Tooltip position="bottom" trigger={<CircleInfoIcon />}>
  {amount.label}
</Tooltip>
```

**Fix:** `TransactionToastContent` already receives `toastId` and `onForceUpdate`. Add `isAmountTooltipVisible` + `onAmountTooltipVisibilityChange` props, pass them from `TransactionToast`, which gets them from `ToastList` (class component with `@State`).

**Simpler alternative:** Use the existing `MvxTooltip` wrapper from `src/components/visual/tooltip/tooltip.tsx` which has a module-level Map for state — but needs `tooltipKey={toastId + '-amount'}` to be stable AND needs `onTriggerRender={onForceUpdate}` to trigger re-renders.

---

## ✅ Everything Else — No Issues

| Area | Status | Notes |
|------|--------|-------|
| All 24 icon components | ✅ OK | Props, types, SVG preserved. Classes correctly propagated. |
| `shard-icon` `shard` prop | ✅ OK | `number` → `number?` with same default `0` |
| `getProviderButtonIcon.tsx` | ✅ OK | Direct icon function imports replace custom elements |
| `TransactionAssetIcon.tsx` | ✅ OK | Icon functions replace custom elements |
| `TransactionShards.tsx` | ✅ OK | `ArrowRightIcon` function replaces `mvx-arrow-right-icon` |
| `ledger-confirm.tsx` | ✅ OK | `<Host>` → `<div>`, same render logic |
| `ledger-intro.tsx` | ✅ OK | Delegates to `common/LedgerIntro/LedgerIntro` (same UI) |
| `LedgerIntro` (common) | ✅ OK | `mvx-ledger-icon` → `LedgerIcon` function |
| `ledger-connect.tsx` | ✅ OK | Imports updated correctly |
| `ProviderIdleScreen.tsx` | ✅ OK | `onConnect` prop passed correctly |
| `wallet-connect-scan.tsx` | ✅ OK | `@Event() downloadClick` → `onDownloadClick` prop |
| `wallet-connect-download.tsx` | ✅ OK | Icons replaced correctly |
| `wallet-connect.tsx` | ✅ OK | `onDownloadClick` event binding correct |
| `transaction-toast-details.tsx` | ✅ OK | Expand/collapse via module-level Map + `onForceUpdate` is logically equivalent |
| `transaction-toast.tsx` | ✅ OK | `@Event() deleteToast` → `onDeleteToast` prop |
| `transaction-toast-content.tsx` | ✅ OK (except tooltip — see Issue 2) | |
| `transaction-toast-details-body.tsx` | ✅ OK | CopyButton/ExplorerLink from common |
| `simple-toast.tsx` | ✅ OK | |
| `generic-toast.tsx` | ✅ OK | |
| `custom-toast.tsx` | ✅ OK | `ref={initializeToast}` closure behavior equivalent |
| `toast-list.tsx` | ✅ OK | Uses `{...toast}` spread + `onForceUpdate` |
| `notifications-feed.tsx` | ✅ OK | `onForceUpdate` added |
| `tooltip.tsx` (MvxTooltip) | ✅ OK (unused) | No callers in codebase |
| `preloader.tsx` | ✅ OK | `<slot />` → `children` |
| `Pagination.tsx` | ✅ OK | Already functional |
| `PaginationEllipsis.tsx` | ✅ OK | Already functional |
| `PaginationEllipsisForm.tsx` | ✅ OK | `MagnifyingGlassIcon` replaces custom element |
| `address-table.tsx` Tooltips | ✅ OK | `@State isButtonTooltipVisible` + `@State shardTooltipVisibility` added |
| `data-with-explorer-link.tsx` Tooltips | ✅ OK | `@State isCopyTooltipVisible` + `@State isExplorerTooltipVisible` |
| `unlock-panel/getProviderButtonIcon` | ✅ OK | |

### Minor Note (no action needed):
- `address-table.tsx`: `part="address"` removed from `<Trim>`. Since `address-table` uses `shadow: false`, CSS Shadow Parts have no effect anyway — no functional impact.
- Module-level Maps in `transaction-toast-details.tsx` are never cleaned up — minor memory leak, but not a regression from original behavior.

---

## Fix Instructions for Next Agent

Fix the two tooltip issues described above. The simplest approach for both:

**For `transaction-toast-content.tsx`:**
Add `isAmountTooltipVisible` and `onAmountTooltipVisibilityChange` props. Then trace up the call chain:
- `TransactionToast` → add same props, pass through
- `toast-list.tsx` (`ToastList` class) → add `@State() amountTooltipVisibility: Record<string, boolean> = {}`, pass per-toast visibility keyed by `toastId`
- `notifications-feed.tsx` → same pattern

**For `TransactionValue.tsx`:**
Add `isTooltipVisible` and `onTooltipVisibilityChange` props. Then:
- `transactions-table.tsx` → add `@State() valueTooltipStates: Record<number, boolean> = {}`, pass per-row state

After fixing, run `npm test` to verify all 130 tests still pass, then `npm run build` to verify bundle size.
