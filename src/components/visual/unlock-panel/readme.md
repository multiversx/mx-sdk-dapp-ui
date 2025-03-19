# side-panel



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute | Description | Type                 | Default                           |
| ------------------ | --------- | ----------- | -------------------- | --------------------------------- |
| `allowedProviders` | --        |             | `ProviderTypeEnum[]` | `Object.values(ProviderTypeEnum)` |
| `isOpen`           | `is-open` |             | `boolean`            | `false`                           |


## Events

| Event   | Description | Type                                                                 |
| ------- | ----------- | -------------------------------------------------------------------- |
| `close` |             | `CustomEvent<any>`                                                   |
| `login` |             | `CustomEvent<{ provider: ProviderTypeEnum; anchor?: HTMLElement; }>` |


## Dependencies

### Depends on

- [side-panel](../side-panel)
- [unlock-header](./components/header)
- [provider-button](./components/provider-button)

### Graph
```mermaid
graph TD;
  unlock-panel --> side-panel
  unlock-panel --> unlock-header
  unlock-panel --> provider-button
  side-panel --> fa-icon
  unlock-header --> fa-icon
  provider-button --> unlock-button
  style unlock-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
