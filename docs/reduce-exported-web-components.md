# Task: Reduce Exported Web Components

## Background

Iulia has been refactoring internal components into plain functions/functional components (not exported as web components). This reduces bundle size — confirmed by comparing builds:

- Commit `96ccca55` (before refactoring): `dist/web-components` = **2.2MB**
- Commit `0db2a31a` (after refactoring): `dist/web-components` = **2.1MB**

The goal is to continue this work and convert all web components that are **not consumed externally** into internal functions.

---

## Objective

Only the web components actually used by external consumers should remain as registered custom elements. Everything else should be refactored into internal functional components (React-style functions or plain TS functions).

---

## External Consumers

The only projects that consume `mx-sdk-dapp-ui` are:

- `/Users/tudor/Work/mx-sdk-dapp`
- `/Users/tudor/Work/mx-wallet-dapp`
- `/Users/tudor/Work/mx-template-dapp`

---

## Components to KEEP as Web Components

These must remain as exported web components. This includes both components imported directly as custom elements AND components consumed via React wrappers — since React wrappers are thin wrappers around the underlying web component, the web component itself must still be exported.

| Component | Used by | How |
|-----------|---------|-----|
| `mvx-sign-transactions-panel` | mx-sdk-dapp | web component |
| `mvx-wallet-connect` | mx-sdk-dapp | web component |
| `mvx-pending-transactions-panel` | mx-sdk-dapp | web component |
| `mvx-notifications-feed` | mx-sdk-dapp | web component |
| `mvx-toast-list` | mx-sdk-dapp | web component |
| `mvx-unlock-panel` | mx-sdk-dapp | web component |
| `mvx-ledger-connect` | mx-sdk-dapp | web component |
| `mvx-format-amount` | mx-wallet-dapp, mx-template-dapp | web component + React wrapper |
| `mvx-copy-button` | mx-wallet-dapp, mx-template-dapp | web component + React wrapper |
| `mvx-explorer-link` | mx-wallet-dapp, mx-template-dapp | web component + React wrapper |
| `mvx-trim` | mx-template-dapp | web component + React wrapper |
| `mvx-address-table` | mx-wallet-dapp, mx-template-dapp | React wrapper |
| `mvx-button` | mx-template-dapp | React wrapper |
| `mvx-data-with-explorer-link` | mx-template-dapp | React wrapper |
| `mvx-transactions-table` | mx-template-dapp | React wrapper |

---

## Components to Convert to Internal Functions

All 70 currently exported web components minus those listed above. Candidates include:

- `mvx-side-panel`
- `mvx-side-panel-header`
- `mvx-side-panel-swiper`
- `mvx-sign-transactions-advanced`
- `mvx-sign-transactions-advanced-data`
- `mvx-sign-transactions-advanced-data-decode`
- `mvx-sign-transactions-footer`
- `mvx-sign-transactions-header`
- `mvx-sign-transactions-overview`
- `mvx-unlock-panel-footer`
- `mvx-unlock-panel-group`
- `mvx-unlock-provider-button`
- `mvx-unlock-button`
- `mvx-wallet-connect-download`
- `mvx-wallet-connect-scan`
- `mvx-ledger-confirm`
- `mvx-ledger-intro`
- `mvx-transaction-list-item`
- `mvx-transaction-toast`
- `mvx-transaction-toast-content`
- `mvx-transaction-toast-details`
- `mvx-transaction-toast-details-body`
- `mvx-transaction-toast-progress`
- `mvx-custom-toast`
- `mvx-generic-toast`
- `mvx-simple-toast`
- `mvx-pagination`
- `mvx-pagination-ellipsis`
- `mvx-pagination-ellipsis-form`
- `mvx-preloader`
- `mvx-tooltip`
- All provider icon components (`mvx-*-icon`, `mvx-*-provider-icon`, etc.)

> **Note:** Confirm each of these is not consumed anywhere externally before converting. A final grep across all consumer repos is recommended before converting each one.

---

## Important: Stylesheet Requirement

When converting a web component to an internal functional component, Stencil still requires a `.scss` file (even if empty) to be referenced by the component in order to trigger Tailwind compilation for inline Tailwind classes. Without it, Tailwind classes used in JSX will not be compiled into the shadow DOM styles and the component will render unstyled.

Each converted component that uses inline Tailwind classes must include a stylesheet with the following comment:

```scss
// This is needed to trigger the Stecil Tailwind compilation for inline Tailwind classes.
```

See existing example: `src/components/visual/tooltip/tooltip.scss`.

---

## Steps

1. [ ] Grep all three consumer repos for any import from `@multiversx/sdk-dapp-ui` and compile final authoritative list.
2. [ ] For each component not in the "keep" list: refactor from a Stencil web component into an internal functional component.
3. [ ] Remove the web component registration (`customElements.define`) for converted components.
4. [ ] Update internal usages to use the functional component directly (no custom element tag).
5. [ ] Run build and verify `dist/web-components` size reduction.
6. [ ] Ensure no regressions in consumer repos.

---

## Reference

- Refactoring examples already done by Iulia:
  - `ae695e9` — Refactored unlock panel components
  - `47658e3` — Refactored sign transactions panel internal components
