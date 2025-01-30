# transactions-table



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default                |
| -------- | --------- | ----------- | -------- | ---------------------- |
| `class`  | `class`   |             | `string` | `'transactions-table'` |
| `data`   | `data`    |             | `string` | `undefined`            |


## Dependencies

### Depends on

- [transaction-row](./components/transaction-row)

### Graph
```mermaid
graph TD;
  transactions-table --> transaction-row
  transaction-row --> transaction-hash
  transaction-row --> transaction-age
  transaction-row --> transaction-account
  transaction-row --> transaction-method
  transaction-hash --> transaction-icon
  transaction-hash --> explorer-link
  transaction-icon --> fa-icon
  transaction-account --> fa-icon
  transaction-account --> explorer-link
  transaction-account --> transaction-account-name
  style transactions-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
