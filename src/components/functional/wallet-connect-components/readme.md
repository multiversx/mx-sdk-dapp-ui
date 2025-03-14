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

- [generic-modal](../../../common/generic-modal)
- [wallet-connect-body](components)

### Graph
```mermaid
graph TD;
  wallet-connect-panel --> generic-modal
  wallet-connect-panel --> wallet-connect-body
  wallet-connect-body --> generic-spinner
  style wallet-connect-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
