# transactions-table



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `data`   | `data`    |             | `string` | `undefined` |


## Dependencies

### Depends on

- [transaction-row](./components/transaction-row)

### Graph
```mermaid
graph TD;
  transactions-table --> transaction-row
  transaction-row --> transaction-hash
  transaction-hash --> transaction-icon
  transaction-hash --> explorer-link
  style transactions-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
