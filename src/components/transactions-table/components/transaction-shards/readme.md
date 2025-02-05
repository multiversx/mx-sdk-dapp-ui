# transaction-shards



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute | Description | Type                    | Default     |
| ------------- | --------- | ----------- | ----------------------- | ----------- |
| `class`       | `class`   |             | `string`                | `undefined` |
| `transaction` | --        |             | `ITransactionsTableRow` | `undefined` |


## Dependencies

### Used by

 - [transactions-table](../..)

### Depends on

- [explorer-link](../../../explorer-link)

### Graph
```mermaid
graph TD;
  transaction-shards --> explorer-link
  explorer-link --> fa-icon
  transactions-table --> transaction-shards
  style transaction-shards fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
