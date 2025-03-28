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
- [provider-button](./components/provider-button)

### Graph
```mermaid
graph TD;
  unlock-panel --> side-panel
  unlock-panel --> provider-button
  side-panel --> back-arrow-icon
  side-panel --> close-icon
  provider-button --> extension-provider-icon
  provider-button --> metamask-provider-icon
  provider-button --> passkey-provider-icon
  provider-button --> multiversx-logo-icon
  provider-button --> ledger-provider-icon
  provider-button --> wallet-provider-icon
  provider-button --> xalias-provider-icon
  provider-button --> internal-unlock-button
  internal-unlock-button --> multiversx-logo-icon
  internal-unlock-button --> arrow-up-right-icon
  style unlock-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
