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
- [transaction-account](../transaction-account)
- [transaction-method](../transaction-method)

### Graph
```mermaid
graph TD;
  transaction-row --> transaction-hash
  transaction-row --> transaction-age
  transaction-row --> transaction-account
  transaction-row --> transaction-method
  transaction-hash --> transaction-icon
  transaction-hash --> explorer-link
  transaction-icon --> fontawesome-icon
  transaction-account --> fontawesome-icon
  transaction-account --> explorer-link
  transaction-account --> transaction-account-name
  transactions-table --> transaction-row
  style transaction-row fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
