# simple-toast



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type               | Default     |
| -------- | --------- | ----------- | ------------------ | ----------- |
| `toast`  | --        |             | `ISimpleToastType` | `undefined` |


## Events

| Event               | Description | Type                |
| ------------------- | ----------- | ------------------- |
| `handleDeleteToast` |             | `CustomEvent<void>` |


## Dependencies

### Used by

 - [custom-toast](../..)

### Depends on

- [transaction-toast-wrapper](../../../transaction-toast/components/transaction-toast-wrapper)

### Graph
```mermaid
graph TD;
  simple-toast --> transaction-toast-wrapper
  custom-toast --> simple-toast
  style simple-toast fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
