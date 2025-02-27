# transaction-toast-list

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute | Description | Type                  | Default     |
| ------------------- | --------- | ----------- | --------------------- | ----------- |
| `customToasts`      | --        |             | `CustomToastType[]`   | `undefined` |
| `transactionToasts` | --        |             | `ITransactionToast[]` | `undefined` |


## Methods

### `getEventBus() => Promise<IEventBus>`



#### Returns

Type: `Promise<IEventBus>`




## Dependencies

### Used by

 - [notifications-feed](../notifications-feed)

### Depends on

- [generic-toast](./components/custom-toast)
- [transaction-toast](./components/transaction-toast)

### Graph
```mermaid
graph TD;
  toast-list --> generic-toast
  toast-list --> transaction-toast
  generic-toast --> custom-toast
  generic-toast --> simple-toast
  simple-toast --> transaction-toast-wrapper
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
  notifications-feed --> toast-list
  style toast-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
