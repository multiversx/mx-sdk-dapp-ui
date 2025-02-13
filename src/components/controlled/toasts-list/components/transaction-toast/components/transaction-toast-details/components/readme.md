# transaction-toast-details-body



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type     | Default                   |
| ------------------ | ------------------- | ----------- | -------- | ------------------------- |
| `hash`             | `hash`              |             | `string` | `undefined`               |
| `link`             | `link`              |             | `string` | `undefined`               |
| `status`           | `status`            |             | `string` | `undefined`               |
| `transactionClass` | `transaction-class` |             | `string` | `'transaction-container'` |


## Dependencies

### Used by

 - [transaction-toast-details](..)

### Depends on

- [trim-text](../../../../../../../visual/trim)
- [copy-button](../../../../../../../functional/copy-button)
- [explorer-link](../../../../../../../visual/explorer-link)

### Graph
```mermaid
graph TD;
  transaction-toast-details-body --> trim-text
  transaction-toast-details-body --> copy-button
  transaction-toast-details-body --> explorer-link
  copy-button --> fa-icon
  explorer-link --> fa-icon
  transaction-toast-details --> transaction-toast-details-body
  style transaction-toast-details-body fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
