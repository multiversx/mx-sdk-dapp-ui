# side-panel



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description | Type                 | Default                           |
| ---------------------- | ------------------------ | ----------- | -------------------- | --------------------------------- |
| `allowedProviders`     | --                       |             | `ProviderTypeEnum[]` | `Object.values(ProviderTypeEnum)` |
| `isExtensionAvailable` | `is-extension-available` |             | `boolean`            | `false`                           |
| `isOpen`               | `is-open`                |             | `boolean`            | `false`                           |


## Events

| Event   | Description | Type                                                                 |
| ------- | ----------- | -------------------------------------------------------------------- |
| `close` |             | `CustomEvent<any>`                                                   |
| `login` |             | `CustomEvent<{ provider: ProviderTypeEnum; anchor?: HTMLElement; }>` |


## Dependencies

### Depends on

- [side-panel](../side-panel)
- [provider-button](./components/provider-button)

### Graph
```mermaid
graph TD;
  unlock-panel --> side-panel
  unlock-panel --> provider-button
  side-panel --> back-arrow-icon
  side-panel --> close-icon
  provider-button --> unlock-button
  style unlock-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
