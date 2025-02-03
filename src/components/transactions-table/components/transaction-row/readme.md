# transaction-row



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute | Description | Type                    | Default             |
| ------------- | --------- | ----------- | ----------------------- | ------------------- |
| `class`       | `class`   |             | `string`                | `'transaction-row'` |
| `transaction` | --        |             | `ITransactionsTableRow` | `undefined`         |


## Dependencies

### Used by

 - [transactions-table](../..)

### Depends on

- [transaction-hash](../transaction-hash)
- [transaction-age](../transaction-age)
- [transaction-shards](../transaction-shards)
- [transaction-account](../transaction-account)
- [transaction-direction-badge](../transaction-direction-badge)
- [transaction-method](../transaction-method)
- [transaction-value](../transaction-value)

### Graph
```mermaid
graph TD;
  transaction-row --> transaction-hash
  transaction-row --> transaction-age
  transaction-row --> transaction-shards
  transaction-row --> transaction-account
  transaction-row --> transaction-direction-badge
  transaction-row --> transaction-method
  transaction-row --> transaction-value
  transaction-hash --> transaction-icon
  transaction-hash --> explorer-link
  transaction-icon --> fa-icon
  transaction-shards --> explorer-link
  transaction-account --> fa-icon
  transaction-account --> explorer-link
  transaction-account --> transaction-account-name
  transaction-value --> format-amount
  transaction-value --> explorer-link
  transaction-value --> fa-icon
  transactions-table --> transaction-row
  style transaction-row fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
