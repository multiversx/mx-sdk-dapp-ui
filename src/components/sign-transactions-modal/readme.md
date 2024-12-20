# ledger-connect-modal



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                         | Default                                                                                                 |
| -------- | --------- | ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| `data`   | --        |             | `ISignTransactionsModalData` | `{     egldLabel: '',     feeLimit: '',     feeInFiatLimit: '',     total: 0,     currentIndex: 0,   }` |


## Methods

### `getEventBus() => Promise<IEventBus>`



#### Returns

Type: `Promise<IEventBus>`




## Dependencies

### Depends on

- [generic-modal](../../common/generic-modal)
- [sign-transaction-component](./components/sign-transaction-component)
- [generic-spinner](../../common/generic-spinner)

### Graph
```mermaid
graph TD;
  sign-transactions-modal --> generic-modal
  sign-transactions-modal --> sign-transaction-component
  sign-transactions-modal --> generic-spinner
  sign-transaction-component --> balance-component
  style sign-transactions-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
