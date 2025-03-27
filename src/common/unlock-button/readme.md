# unlock-button



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                                                                                                                                                                                                          | Default     |
| ------------- | -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `buttonIcon`  | --             |             | `HTMLElement`                                                                                                                                                                                                 | `undefined` |
| `buttonLabel` | `button-label` |             | `string`                                                                                                                                                                                                      | `undefined` |
| `buttonType`  | `button-type`  |             | `ProviderTypeEnum.crossWindow \| ProviderTypeEnum.extension \| ProviderTypeEnum.ledger \| ProviderTypeEnum.metamask \| ProviderTypeEnum.passkey \| ProviderTypeEnum.walletConnect \| ProviderTypeEnum.xalias` | `undefined` |


## Dependencies

### Used by

 - [provider-button](../../components/visual/unlock-panel/components/provider-button)

### Depends on

- [arrow-up-right-icon](../../assets/icons/arrow-up-right-icon)

### Graph
```mermaid
graph TD;
  unlock-button --> arrow-up-right-icon
  provider-button --> unlock-button
  style unlock-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
