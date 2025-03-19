# transaction-toast



<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute                       | Description | Type                        | Default     |
| ----------------------------- | ------------------------------- | ----------- | --------------------------- | ----------- |
| `processedTransactionsStatus` | `processed-transactions-status` |             | `Element \| string`         | `''`        |
| `toastDataState`              | --                              |             | `IToastDataState`           | `undefined` |
| `toastId`                     | `toast-id`                      |             | `string`                    | `''`        |
| `transactionProgressState`    | --                              |             | `ITransactionProgressState` | `undefined` |
| `transactions`                | --                              |             | `ITransaction[]`            | `[]`        |
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
  transaction-toast-content --> transaction-toast-details
  transaction-toast-details --> fa-icon
  transaction-toast-details --> transaction-toast-details-body
  transaction-toast-details-body --> trim-text
  transaction-toast-details-body --> copy-button
  transaction-toast-details-body --> explorer-link
  copy-button --> fa-icon
  explorer-link --> fa-icon
  notifications-feed --> transaction-toast
  toast-list --> transaction-toast
  style transaction-toast fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
