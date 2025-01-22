# transaction-toast-list

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute | Description | Type                  | Default     |
| ------------------- | --------- | ----------- | --------------------- | ----------- |
| `customToasts`      | --        |             | `ICustomToastType[]`  | `undefined` |
| `transactionToasts` | --        |             | `ITransactionToast[]` | `undefined` |


## Methods

### `getEventBus() => Promise<IEventBus>`



#### Returns

Type: `Promise<IEventBus>`




## Dependencies

### Depends on

- [custom-toast](./components/custom-toast)
- [transaction-toast](./components/transaction-toast)

### Graph
```mermaid
graph TD;
  toast-list --> custom-toast
  toast-list --> transaction-toast
  custom-toast --> custom-create-toast
  custom-toast --> simple-toast
  simple-toast --> transaction-toast-wrapper
  transaction-toast --> transaction-toast-wrapper
  transaction-toast --> transaction-toast-progress
  transaction-toast --> transaction-toast-content
  transaction-toast-content --> transaction-toast-details
  transaction-toast-details --> transaction-toast-details-body
  style toast-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
