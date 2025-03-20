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
  side-panel --> styled-host
  transaction-toast --> transaction-toast-wrapper
  transaction-toast --> transaction-toast-progress
  transaction-toast --> transaction-toast-content
  transaction-toast-content --> transaction-toast-details
  transaction-toast-details --> fa-icon
  transaction-toast-details --> transaction-toast-details-body
  transaction-toast-details-body --> trim-text
  transaction-toast-details-body --> copy-button
  transaction-toast-details-body --> explorer-link
  copy-button --> fa-icon
  explorer-link --> fa-icon
  transaction-list-item --> fa-icon
  transaction-list-item --> trim-text
  style notifications-feed fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
