# sign-transaction-component



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type    | Default     |
| -------- | --------- | ----------- | ------- | ----------- |
| `header` | --        |             | `VNode` | `undefined` |


## Dependencies

### Used by

 - [fungible-component](../fungible-component)
 - [token-component](../token-component)

### Depends on

- [transaction-fee-component](./components/transaction-fee-component)

### Graph
```mermaid
graph TD;
  sign-transaction-component --> transaction-fee-component
  fungible-component --> sign-transaction-component
  token-component --> sign-transaction-component
  style sign-transaction-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
