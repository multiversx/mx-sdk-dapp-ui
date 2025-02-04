# transactions-table



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute | Description | Type                      | Default                |
| -------------- | --------- | ----------- | ------------------------- | ---------------------- |
| `class`        | `class`   |             | `string`                  | `'transactions-table'` |
| `transactions` | --        |             | `ITransactionsTableRow[]` | `undefined`            |


## Dependencies

### Depends on

- [transaction-row](./components/transaction-row)

### Graph
```mermaid
graph TD;
  transactions-table --> transaction-row
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
  style transactions-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
