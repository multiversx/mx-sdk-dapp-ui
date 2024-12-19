# transaction-toast



<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute                       | Description | Type                        | Default     |
| ----------------------------- | ------------------------------- | ----------- | --------------------------- | ----------- |
| `processedTransactionsStatus` | `processed-transactions-status` |             | `any`                       | `''`        |
| `toastDataState`              | --                              |             | `IToastDataState`           | `undefined` |
| `toastId`                     | `toast-id`                      |             | `string`                    | `''`        |
| `transactionProgressState`    | --                              |             | `ITransactionProgressState` | `undefined` |
| `transactions`                | --                              |             | `ITransaction[]`            | `[]`        |
| `wrapperClass`                | `wrapper-class`                 |             | `string`                    | `undefined` |


## Events

| Event               | Description | Type                  |
| ------------------- | ----------- | --------------------- |
| `handleDeleteToast` |             | `CustomEvent<string>` |


## Dependencies

### Depends on

- [transaction-toast-wrapper](./components/transaction-toast-wrapper)
- [transaction-toast-progress](./components/transaction-toast-progress)
- [transaction-toast-content](./components/transaction-toast-content)

### Graph
```mermaid
graph TD;
  transaction-toast --> transaction-toast-wrapper
  transaction-toast --> transaction-toast-progress
  transaction-toast --> transaction-toast-content
  transaction-toast-content --> transaction-toast-details
  transaction-toast-details --> transaction-toast-details-body
  style transaction-toast fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
