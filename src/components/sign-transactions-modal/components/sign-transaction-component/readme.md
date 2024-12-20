# sign-transaction



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                         | Default     |
| -------- | --------- | ----------- | -------------------------------------------- | ----------- |
| `data`   | --        |             | `ITransactionData & { onSign: () => void; }` | `undefined` |


## Dependencies

### Used by

 - [sign-transactions-modal](../..)

### Depends on

- [balance-component](../balance-component)

### Graph
```mermaid
graph TD;
  sign-transaction-component --> balance-component
  sign-transactions-modal --> sign-transaction-component
  style sign-transaction-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
