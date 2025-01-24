# transaction-row



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute | Description | Type                    | Default     |
| ------------- | --------- | ----------- | ----------------------- | ----------- |
| `transaction` | --        |             | `ITransactionsTableRow` | `undefined` |


## Dependencies

### Used by

 - [transactions-table](../..)

### Depends on

- [transaction-hash](../transaction-hash)

### Graph
```mermaid
graph TD;
  transaction-row --> transaction-hash
  transaction-hash --> transaction-icon
  transaction-hash --> explorer-link
  transactions-table --> transaction-row
  style transaction-row fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
