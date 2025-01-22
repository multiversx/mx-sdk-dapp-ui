# custom-toast



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                      | Default     |
| -------- | --------- | ----------- | ----------------------------------------- | ----------- |
| `toast`  | --        |             | `IComponentToastType \| ISimpleToastType` | `undefined` |


## Events

| Event               | Description | Type                  |
| ------------------- | ----------- | --------------------- |
| `handleDeleteToast` |             | `CustomEvent<string>` |


## Dependencies

### Used by

 - [toast-list](../..)

### Depends on

- [custom-create-toast](./components/custom-create-toast)
- [simple-toast](./components/simple-toast)

### Graph
```mermaid
graph TD;
  custom-toast --> custom-create-toast
  custom-toast --> simple-toast
  simple-toast --> transaction-toast-wrapper
  toast-list --> custom-toast
  style custom-toast fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
