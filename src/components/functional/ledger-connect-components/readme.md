# ledger-connect-modal

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                      | Default                                                                                      |
| -------- | --------- | ----------- | ------------------------- | -------------------------------------------------------------------------------------------- |
| `data`   | --        |             | `ILedgerConnectModalData` | `{     accountScreenData: null,     confirmScreenData: null,     connectScreenData: {},   }` |


## Methods

### `getEventBus() => Promise<IEventBus>`



#### Returns

Type: `Promise<IEventBus>`




## Dependencies

### Depends on

- [side-panel](../../visual/side-panel)
- [ledger-account-screen](./components/ledger-account-screen)
- [ledger-confirm-screen](./components/ledger-confirm-screen)
- [ledger-connect-screen](./components/ledger-connect-screen)

### Graph
```mermaid
graph TD;
  ledger-connect-panel --> side-panel
  ledger-connect-panel --> ledger-account-screen
  ledger-connect-panel --> ledger-confirm-screen
  ledger-connect-panel --> ledger-connect-screen
  ledger-account-screen --> generic-spinner
  style ledger-connect-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
