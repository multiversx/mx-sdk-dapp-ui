# sign-transaction



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                                     | Default     |
| -------- | --------- | ----------- | -------------------------------------------------------- | ----------- |
| `data`   | --        |             | `{ transaction: ITransactionData; onSign: () => void; }` | `undefined` |


## Dependencies

### Used by

 - [sign-transactions-modal](../..)

### Depends on

- [mvx-balance](../mvx-balance)

### Graph
```mermaid
graph TD;
  mvx-sign-transaction --> mvx-balance
  sign-transactions-modal --> mvx-sign-transaction
  style mvx-sign-transaction fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
