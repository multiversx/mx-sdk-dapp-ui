# transaction-toast-list



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                  | Default     |
| -------- | --------- | ----------- | --------------------- | ----------- |
| `data`   | --        |             | `ITransactionToast[]` | `undefined` |


## Methods

### `getEventBus() => Promise<IEventBus>`



#### Returns

Type: `Promise<IEventBus>`




## Dependencies

### Depends on

- [transaction-toast](../..)

### Graph
```mermaid
graph TD;
  transaction-toast-list --> transaction-toast
  transaction-toast --> transaction-toast-wrapper
  transaction-toast --> transaction-toast-progress
  transaction-toast --> transaction-toast-content
  transaction-toast-content --> transaction-toast-details
  transaction-toast-details --> transaction-toast-details-body
  style transaction-toast-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
