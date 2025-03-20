# wallet-connect-modal

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                      | Default                |
| -------- | --------- | ----------- | ------------------------- | ---------------------- |
| `data`   | --        |             | `IWalletConnectPanelData` | `{     wcURI: '',   }` |


## Methods

### `getEventBus() => Promise<IEventBus>`



#### Returns

Type: `Promise<IEventBus>`




## Dependencies

### Depends on

- [side-panel](../../visual/side-panel)
- [wallet-connect-body](components)

### Graph
```mermaid
graph TD;
  wallet-connect-panel --> side-panel
  wallet-connect-panel --> wallet-connect-body
  side-panel --> styled-host
  wallet-connect-body --> generic-spinner
  style wallet-connect-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
