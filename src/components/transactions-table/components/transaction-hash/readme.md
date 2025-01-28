# my-component



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute | Description | Type                    | Default     |
| ------------- | --------- | ----------- | ----------------------- | ----------- |
| `transaction` | --        |             | `ITransactionsTableRow` | `undefined` |


## Dependencies

### Used by

 - [transaction-row](../transaction-row)

### Depends on

- [transaction-icon](../transaction-icon)
- [explorer-link](../../../explorer-link)

### Graph
```mermaid
graph TD;
  transaction-hash --> transaction-icon
  transaction-hash --> explorer-link
  transaction-row --> transaction-hash
  style transaction-hash fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
