# side-panel



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute | Description | Type                 | Default                           |
| ------------------ | --------- | ----------- | -------------------- | --------------------------------- |
| `allowedProviders` | --        |             | `ProviderTypeEnum[]` | `Object.values(ProviderTypeEnum)` |
| `open`             | `open`    |             | `boolean`            | `false`                           |


## Events

| Event   | Description | Type                                                                 |
| ------- | ----------- | -------------------------------------------------------------------- |
| `close` |             | `CustomEvent<any>`                                                   |
| `login` |             | `CustomEvent<{ provider: ProviderTypeEnum; anchor?: HTMLElement; }>` |


## Dependencies

### Depends on

- [unlock-header](./components/header)
- [provider-button](./components/provider-button)

### Graph
```mermaid
graph TD;
  unlock-panel --> unlock-header
  unlock-panel --> provider-button
  unlock-header --> fa-icon
  provider-button --> unlock-button
  style unlock-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
