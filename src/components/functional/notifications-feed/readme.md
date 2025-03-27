# notifications-feed

<!-- Auto Generated Below -->

## Methods

### `getEventBus() => Promise<IEventBus>`

#### Returns

Type: `Promise<IEventBus>`

## Dependencies

### Depends on

- [side-panel](../../visual/side-panel)
- [fa-icon](../../visual/fa-icon)
- [transaction-toast](../toasts-list/components/transaction-toast)
- [transaction-list-item](../../visual/transaction-list-item)

### Graph

```mermaid
graph TD;
  notifications-feed --> side-panel
  notifications-feed --> fa-icon
  notifications-feed --> transaction-toast
  notifications-feed --> transaction-list-item
  side-panel --> back-arrow-icon
  side-panel --> close-icon
  transaction-toast --> transaction-toast-wrapper
  transaction-toast --> transaction-toast-progress
  transaction-toast --> transaction-toast-content
  transaction-toast-content --> fa-icon
  transaction-toast-content --> trim-text
  transaction-toast-content --> explorer-link
  transaction-toast-content --> transaction-toast-details
  explorer-link --> fa-icon
  transaction-toast-details --> fa-icon
  transaction-toast-details --> transaction-toast-details-body
  transaction-toast-details-body --> trim-text
  transaction-toast-details-body --> explorer-link
  transaction-toast-details-body --> copy-button
  copy-button --> fa-icon
  transaction-list-item --> fa-icon
  transaction-list-item --> trim-text
  style notifications-feed fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
