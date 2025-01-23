# transaction-toast-details



<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute                       | Description | Type                | Default     |
| ----------------------------- | ------------------------------- | ----------- | ------------------- | ----------- |
| `processedTransactionsStatus` | `processed-transactions-status` |             | `Element \| string` | `undefined` |
| `transactionClass`            | `transaction-class`             |             | `string`            | `undefined` |
| `transactions`                | --                              |             | `ITransaction[]`    | `undefined` |


## Dependencies

### Used by

 - [transaction-toast-content](../transaction-toast-content)

### Depends on

- [transaction-toast-details-body](components)

### Graph
```mermaid
graph TD;
  transaction-toast-details --> transaction-toast-details-body
  transaction-toast-content --> transaction-toast-details
  style transaction-toast-details fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
