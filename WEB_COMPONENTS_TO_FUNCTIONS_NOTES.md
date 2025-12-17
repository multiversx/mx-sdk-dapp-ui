## Context

This project is in the middle of a **migration away from Stencil-style web components and SCSS-heavy monoliths** toward **small, typed functions that return JSX** (functional components), with colocated `.styles.ts` files and shared primitives under `src/common` and `src/components/functional` / `src/components/visual`.

Recent work by **Iulia** laid down most of the new patterns, especially around:

- **Sign transactions panel internals**
- **Side panel components**
- **Transaction list item and related icons**
- **Shared primitives** like `Button`, `CopyButton`, `Tooltip`, and icon components

This document summarizes what changed and how to continue the same direction.

---

## Key commits by Iulia

### 1. Refactored sign transactions panel internals

**Commit:** `47658e3` – _Refactored sign transactions panel internal components (#267)_

**Goals:**
- Break up the sign-transactions panel into **smaller, testable functional components**.
- Migrate styling from raw `.scss` files into **typed `.styles.ts` modules**.
- Move generic UI pieces (button, tooltip, copy button, icons) into **reusable common primitives**.

**Main changes:**
- Introduced / updated shared primitives in `src/common`:
  - `src/common/Button/Button.tsx`, `button.styles.ts`, `button.types.ts`
  - `src/common/CopyButton/CopyButton.tsx`, `getCopyClickAction.ts`
  - `src/common/Tooltip/Tooltip.tsx`
  - `src/common/Icon/Icon.tsx`, plus icon components like `ArrowRightIcon` and `SpinnerIcon`
- Introduced functional sign-transactions internals under the functional layer:
  - `SignTransactionsFooter`, `SignTransactionsOverview`, `SignTransactionsAdvanced`
  - `SignTransactionsAdvancedData`, `SignTransactionsAdvancedDataDecode`
  - `SignTransactionsHeader`
  - Matching `*.styles.ts` files for each of the above
- Rewired the main sign-transactions panel to use these **functional pieces** and `.styles.ts` instead of monolithic TSX + SCSS.
- Deleted old, more “web-component style” implementations:
  - `sign-transactions-advanced*.tsx/.scss`
  - `sign-transactions-footer*.tsx/.scss`
  - `sign-transactions-overview*.tsx/.scss`
- Updated:
  - `src/components.d.ts`
  - Tests related to sign-transactions
  - `src/global/tailwind.css`
  - `CHANGELOG.md`

**Key pattern:** Feature-specific panels are now composed from **functional JSX-returning helpers** and **shared primitives**, not from big Stencil components with their own duplicated logic.

---

### 2. Refactored side panel components

**Commit:** `c4d0de3` – _Refactored side panel components (#271)_

**Goals:**
- Replace the old **kebab-case side-panel web component** (`side-panel`) with a **new SidePanel functional API**.
- Centralize side-panel behavior and animation in a few focused functions and a small store.
- Align side-panel-related consumers (unlock panel, wallet connect, sign-transactions, etc.) with the new functional approach.

**Main changes:**
- New functional visual entry point:
  - `src/components/visual/SidePanel/SidePanel.tsx`
  - Subcomponents:
    - `components/SidePanelHeader/SidePanelHeader.tsx`
    - `components/SidePanelSwiper/SidePanelSwiper.tsx`
  - Helpers and state:
    - `helpers/handleSidePanelOpenChange.ts`
    - `sidePanelStore.ts`
  - Styles:
    - `sidePanel.styles.ts`
    - `SidePanelSwiper/sidePanelSwiper.styles.ts`
- Example of the new SidePanel function signature:
  - Takes a props object (`SidePanelPropsType`) plus `children: JSX.Element`
  - Uses Stencil `h()` internally but is written as a **function component** instead of a custom element class.
- Removed / replaced older side-panel web component files:
  - `src/components/visual/side-panel/side-panel.tsx`
  - `src/components/visual/side-panel/side-panel.scss`
  - Old header and swiper TSX + SCSS files
- Updated consumers to use the new SidePanel:
  - `unlock-panel`, `wallet-connect`, `pending-transactions-panel`, `sign-transactions-panel`, etc.
- Reorganized shared visual pieces so that the same primitives are reused:
  - Moved `button`, `copy-button`, `tooltip`, `trim` between `common` and `visual` to match the new architecture.
- Updated tests, `CHANGELOG.md`, and various styles (e.g., panel-specific SCSS and Tailwind utilities).

**Key pattern:** The “shell” (SidePanel) is now a **pure function + styles + small store** instead of a dedicated web component; screens interact with it via props and content children.

---

### 3. Refactored transaction list item

**Commit:** `82d1b7c` – _Refactored transaction list item (#274)_

**Goals:**
- Bring the transaction list item in line with the **functional + styles module** pattern.
- Introduce a reusable “default transaction” icon small variant for use in lists and toasts.

**Main changes:**
- New functional implementation:
  - `TransactionListItem/TransactionListItem.tsx`
  - `transactionListItem.styles.ts`
  - `transactionListItem.types.ts`
- Removed old files:
  - `transaction-list-item.tsx`
  - `transaction-list-item.scss`
- Icon updates:
  - Added `DefaultTransactionIconSmall` under `src/common/Icon/components`
  - Registered it in `src/common/Icon/icon.types.ts`
  - Updated `TransactionAssetIcon` and toast/notifications components to use the new icon where appropriate.
- Tests & style updates:
  - Updated `transaction-list-item` tests
  - Adjusted relevant toast/notifications tests
  - Tweaked `src/global/tailwind.css` entries
  - Updated `CHANGELOG.md`

**Key pattern:** List item UI is now implemented as **typed, composable TSX functions** with `.styles.ts`, using shared icons and primitives instead of ad-hoc TSX + SCSS.

---

### 4. Follow-up fixes and cleanups

- **Copy button fix & version bump**
  - **Commit:** `02ebe4a` – _Fixed copy button (#276)_
  - Small fixes in `src/common/CopyButton/CopyButton.tsx`
  - Updated `package.json` version and `CHANGELOG.md`

- **Other important maintenance commits by Iulia**
  - `0db2a31` – Fixed trimmed address not showing in address-table.
  - `88ba5d7` – ESLint and Prettier config fixes.
  - `81f0639`, `76ef425` – Version bumps and minor adjustments.
  - `ce67d4b` – Fixed compatibility issue with `@stencil/core`.

---

## Patterns to follow when continuing this work

When continuing the migration from web components to functional components, try to:

- **Identify old web-component-style code:**
  - Kebab-case component names (`side-panel`, `transaction-list-item`, etc.)
  - Paired `.tsx` + `.scss` files living under `src/components/...` with a lot of DOM, styling, and behavior in one place.
  - Usage of custom elements in templates rather than composable functions.

- **Replace them with functional building blocks:**
  - Create a **function component** that takes a typed props object plus children (`(props, children) => JSX.Element`).
  - Co-locate a `.styles.ts` file next to the component and use `classNames` or `{ [styles.className]: condition }` patterns.
  - Move shared concerns (buttons, icons, tooltips, copy actions) into `src/common` so other areas can reuse them.

- **Keep behavior small and composable:**
  - Extract behavior helpers (e.g., `handleSidePanelOpenChange.ts`) instead of inlining logic into the JSX mega function.
  - Use simple store modules (like `sidePanelStore.ts`) for cross-instance state that needs to be shared.

- **Update types and declarations:**
  - Update `src/components.d.ts` when public component signatures change.
  - Ensure any new functional primitives have clear TypeScript types (e.g., `*.types.ts` files).

- **Align tests and styles:**
  - Port or rewrite tests to use the new function components and props.
  - Migrate styling logic out of legacy SCSS files into `.styles.ts` and/or Tailwind utilities where appropriate.

---

## How to use this document as the next contributor

When you pick up this work:

1. **Before refactoring a component**, check whether there’s already a matching pattern:
   - For panels: look at `SidePanel` and the sign-transactions internals.
   - For lists/toasts: look at `TransactionListItem` and `TransactionAssetIcon`.
   - For UI primitives: check `src/common/Button`, `CopyButton`, `Tooltip`, and `Icon`.
2. **Mirror Iulia’s structure**:
   - New component: `ComponentName.tsx`
   - Types: `componentName.types.ts` (if needed)
   - Styles: `componentName.styles.ts`
   - Optional: helpers and small stores under `helpers/` or sibling files.
3. **Remove or deprecate the old web-component-style implementation** once the new function-based implementation is wired everywhere and tests pass.
4. **Document your changes in the changelog** and ensure tests are updated or added for new behavior.

By following these patterns, you keep the codebase consistent with Iulia’s direction and make it easier for future agents (and teammates) to understand and help with the migration.


