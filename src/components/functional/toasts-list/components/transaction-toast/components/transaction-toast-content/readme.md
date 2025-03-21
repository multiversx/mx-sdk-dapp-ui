# transaction-toast-content



<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute                       | Description | Type                     | Default     |
| ----------------------------- | ------------------------------- | ----------- | ------------------------ | ----------- |
| `processedTransactionsStatus` | `processed-transactions-status` |             | `Element \| string`      | `undefined` |
| `toastDataState`              | --                              |             | `IToastDataState`        | `undefined` |
| `transactions`                | --                              |             | `ITransactionListItem[]` | `undefined` |


## Events

| Event         | Description | Type                |
| ------------- | ----------- | ------------------- |
| `deleteToast` |             | `CustomEvent<void>` |


## Dependencies

### Used by

 - [transaction-toast](../..)

### Depends on

- [fa-icon](../../../../../../visual/fa-icon)
- [trim-text](../../../../../../visual/trim)
- [explorer-link](../../../../../../visual/explorer-link)
- [transaction-toast-details](../transaction-toast-details)

### Graph
```mermaid
graph TD;
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
  transaction-toast --> transaction-toast-content
  style transaction-toast-content fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
