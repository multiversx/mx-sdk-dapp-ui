# transaction-value



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                | Default               |
| -------- | --------- | ----------- | ------------------- | --------------------- |
| `class`  | `class`   |             | `string`            | `'transaction-value'` |
| `value`  | --        |             | `ITransactionValue` | `undefined`           |


## Dependencies

### Used by

 - [transaction-row](../transaction-row)

### Depends on

- [format-amount](../../../format-amount)
- [explorer-link](../../../explorer-link)
- [fa-icon](../../../fa-icon)

### Graph
```mermaid
graph TD;
  transaction-value --> format-amount
  transaction-value --> explorer-link
  transaction-value --> fa-icon
  transaction-row --> transaction-value
  style transaction-value fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
