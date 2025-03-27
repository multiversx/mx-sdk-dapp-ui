# transaction-toast



<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute                       | Description | Type                        | Default     |
| ----------------------------- | ------------------------------- | ----------- | --------------------------- | ----------- |
| `fullWidth`                   | `full-width`                    |             | `boolean`                   | `undefined` |
| `processedTransactionsStatus` | `processed-transactions-status` |             | `Element \| string`         | `''`        |
| `toastDataState`              | --                              |             | `IToastDataState`           | `undefined` |
| `toastId`                     | `toast-id`                      |             | `string`                    | `''`        |
| `transactionProgressState`    | --                              |             | `ITransactionProgressState` | `undefined` |
| `transactions`                | --                              |             | `ITransactionListItem[]`    | `[]`        |
| `wrapperClass`                | `wrapper-class`                 |             | `string`                    | `undefined` |


## Events

| Event         | Description | Type                |
| ------------- | ----------- | ------------------- |
| `deleteToast` |             | `CustomEvent<void>` |


## Dependencies

### Used by

 - [notifications-feed](../../../notifications-feed)
 - [toast-list](../..)

### Depends on

- [transaction-toast-progress](./components/transaction-toast-progress)
- [transaction-toast-content](./components/transaction-toast-content)

### Graph
```mermaid
graph TD;
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
  notifications-feed --> transaction-toast
  toast-list --> transaction-toast
  style transaction-toast fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
