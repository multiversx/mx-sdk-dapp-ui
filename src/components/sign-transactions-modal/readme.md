# ledger-connect-modal



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                         | Default                                                                                                                        |
| -------- | --------- | ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `data`   | --        |             | `ISignTransactionsModalData` | `{     transaction: null,     egldLabel: '',     feeLimit: '',     feeInFiatLimit: '',     total: 0,     currentIndex: 0,   }` |


## Methods

### `getEventBus() => Promise<IEventBus>`



#### Returns

Type: `Promise<IEventBus>`




## Dependencies

### Depends on

- [generic-modal](../../common/generic-modal)

### Graph
```mermaid
graph TD;
  sign-transactions-modal --> generic-modal
  style sign-transactions-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
