# transaction-value



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                | Default     |
| -------- | --------- | ----------- | ------------------- | ----------- |
| `class`  | `class`   |             | `string`            | `undefined` |
| `value`  | --        |             | `ITransactionValue` | `undefined` |


## Dependencies

### Used by

 - [transactions-table](../..)

### Depends on

- [format-amount](../../../format-amount)
- [explorer-link](../../../../visual/explorer-link)
- [fa-icon](../../../../visual/fa-icon)

### Graph
```mermaid
graph TD;
  transaction-value --> format-amount
  transaction-value --> explorer-link
  transaction-value --> fa-icon
  explorer-link --> fa-icon
  transactions-table --> transaction-value
  style transaction-value fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
