# wallet-connect-modal



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                      | Default                |
| -------- | --------- | ----------- | ------------------------- | ---------------------- |
| `data`   | --        |             | `IWalletConnectModalData` | `{     wcURI: '',   }` |


## Methods

### `getEventBus() => Promise<import("/Users/iliedaniel/Projects/sdk-dapp-core-workspace/packages/mx-sdk-dapp-core-ui/src/components").IEventBus>`



#### Returns

Type: `Promise<IEventBus>`




## Dependencies

### Depends on

- [generic-modal](../../../common/generic-modal)
- [wallet-connect-body](components)

### Graph
```mermaid
graph TD;
  wallet-connect-modal --> generic-modal
  wallet-connect-modal --> wallet-connect-body
  wallet-connect-body --> generic-spinner
  style wallet-connect-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
