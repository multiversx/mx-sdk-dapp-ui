# pending-transactions-modal



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                            | Default                                                        |
| -------- | --------- | ----------- | ------------------------------- | -------------------------------------------------------------- |
| `data`   | --        |             | `IPendingTransactionsPanelData` | `{     isPending: false,     title: '',     subtitle: '',   }` |


## Methods

### `getEventBus() => Promise<IEventBus>`



#### Returns

Type: `Promise<IEventBus>`




## Dependencies

### Depends on

- [side-panel](../../visual/side-panel)

### Graph
```mermaid
graph TD;
  pending-transactions-panel --> side-panel
  side-panel --> styled-host
  style pending-transactions-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
