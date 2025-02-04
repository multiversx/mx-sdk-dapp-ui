# transactions-table



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute | Description | Type                      | Default     |
| -------------- | --------- | ----------- | ------------------------- | ----------- |
| `class`        | `class`   |             | `string`                  | `undefined` |
| `transactions` | --        |             | `ITransactionsTableRow[]` | `undefined` |


## Dependencies

### Depends on

- [transaction-hash](./components/transaction-hash)
- [transaction-age](./components/transaction-age)
- [transaction-shards](./components/transaction-shards)
- [transaction-account](./components/transaction-account)
- [transaction-method](./components/transaction-method)
- [transaction-value](./components/transaction-value)

### Graph
```mermaid
graph TD;
  transactions-table --> transaction-hash
  transactions-table --> transaction-age
  transactions-table --> transaction-shards
  transactions-table --> transaction-account
  transactions-table --> transaction-method
  transactions-table --> transaction-value
  transaction-hash --> transaction-icon
  transaction-hash --> explorer-link
  transaction-icon --> fa-icon
  explorer-link --> fa-icon
  transaction-shards --> explorer-link
  transaction-account --> fa-icon
  transaction-account --> explorer-link
  transaction-account --> transaction-account-name
  transaction-value --> format-amount
  transaction-value --> explorer-link
  transaction-value --> fa-icon
  style transactions-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
