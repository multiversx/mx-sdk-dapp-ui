# wallet-connect-body



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type     | Default |
| ------------- | ------------- | ----------- | -------- | ------- |
| `description` | `description` |             | `string` | `''`    |
| `qrCodeSvg`   | `qr-code-svg` |             | `string` | `''`    |


## Dependencies

### Used by

 - [wallet-connect](..)
 - [wallet-connect-modal](..)

### Depends on

- [generic-spinner](../../../../common/generic-spinner)

### Graph
```mermaid
graph TD;
  wallet-connect-body --> generic-spinner
  wallet-connect --> wallet-connect-body
  wallet-connect-modal --> wallet-connect-body
  style wallet-connect-body fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
