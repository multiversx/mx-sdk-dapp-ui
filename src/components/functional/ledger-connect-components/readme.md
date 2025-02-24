# ledger-connect-modal



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                      | Default                                                                                      |
| -------- | --------- | ----------- | ------------------------- | -------------------------------------------------------------------------------------------- |
| `data`   | --        |             | `ILedgerConnectModalData` | `{     accountScreenData: null,     confirmScreenData: null,     connectScreenData: {},   }` |


## Methods

### `getEventBus() => Promise<import("/Users/iliedaniel/Projects/sdk-dapp-core-workspace/packages/mx-sdk-dapp-core-ui/src/components").IEventBus>`



#### Returns

Type: `Promise<IEventBus>`




## Dependencies

### Depends on

- [ledger-account-screen](./components/ledger-account-screen)
- [ledger-confirm-screen](./components/ledger-confirm-screen)
- [ledger-connect-screen](./components/ledger-connect-screen)
- [generic-modal](../../../common/generic-modal)

### Graph
```mermaid
graph TD;
  ledger-connect-modal --> ledger-account-screen
  ledger-connect-modal --> ledger-confirm-screen
  ledger-connect-modal --> ledger-connect-screen
  ledger-connect-modal --> generic-modal
  ledger-account-screen --> generic-spinner
  style ledger-connect-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
