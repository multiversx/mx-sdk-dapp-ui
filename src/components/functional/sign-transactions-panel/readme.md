# ledger-connect-modal



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                         | Default                                                                                                                                                                                                                                                      |
| -------- | --------- | ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data`   | --        |             | `ISignTransactionsPanelData` | `{     commonData: {       egldLabel: '',       feeLimit: '',       feeInFiatLimit: '',       transactionsCount: 0,       currentIndex: 0,       ppuOptions: [],     },     tokenTransaction: null,     nftTransaction: null,     sftTransaction: null,   }` |


## Methods

### `getEventBus() => Promise<IEventBus>`



#### Returns

Type: `Promise<IEventBus>`




## Dependencies

### Depends on

- [side-panel](../../visual/side-panel)
- [generic-spinner](../../../common/generic-spinner)

### Graph
```mermaid
graph TD;
  sign-transactions-panel --> side-panel
  sign-transactions-panel --> generic-spinner
  style sign-transactions-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
