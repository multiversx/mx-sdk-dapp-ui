# transaction-toast-details



<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute                       | Description | Type                     | Default     |
| ----------------------------- | ------------------------------- | ----------- | ------------------------ | ----------- |
| `maxShownTransactions`        | `max-shown-transactions`        |             | `number`                 | `5`         |
| `processedTransactionsStatus` | `processed-transactions-status` |             | `Element \| string`      | `undefined` |
| `transactionClass`            | `transaction-class`             |             | `string`                 | `undefined` |
| `transactions`                | --                              |             | `ITransactionListItem[]` | `undefined` |


## Dependencies

### Used by

 - [transaction-toast-content](../transaction-toast-content)

### Depends on

- [fa-icon](../../../../../../visual/fa-icon)
- [transaction-toast-details-body](components)

### Graph
```mermaid
graph TD;
  transaction-toast-details --> fa-icon
  transaction-toast-details --> transaction-toast-details-body
  transaction-toast-details-body --> trim-text
  transaction-toast-details-body --> copy-button
  transaction-toast-details-body --> explorer-link
  copy-button --> fa-icon
  explorer-link --> fa-icon
  transaction-toast-content --> transaction-toast-details
  style transaction-toast-details fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
