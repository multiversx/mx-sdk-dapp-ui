# generic-modal



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type              | Default     |
| --------------- | ---------------- | ----------- | ----------------- | ----------- |
| `body`          | --               |             | `VNode`           | `undefined` |
| `modalSubtitle` | `modal-subtitle` |             | `VNode \| string` | `undefined` |
| `modalTitle`    | `modal-title`    |             | `VNode \| string` | `undefined` |


## Events

| Event   | Description | Type               |
| ------- | ----------- | ------------------ |
| `close` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [ledger-connect-modal](../../components/ledger-connect-modal)
 - [sign-transactions-modal](../../components/sign-transactions-modal)

### Graph
```mermaid
graph TD;
  ledger-connect-modal --> generic-modal
  sign-transactions-modal --> generic-modal
  style generic-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
