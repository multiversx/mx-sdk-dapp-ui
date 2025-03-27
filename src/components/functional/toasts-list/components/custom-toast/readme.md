# custom-toast



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                              | Default     |
| -------- | --------- | ----------- | --------------------------------- | ----------- |
| `toast`  | --        |             | `IComponentToast \| ISimpleToast` | `undefined` |


## Events

| Event         | Description | Type                  |
| ------------- | ----------- | --------------------- |
| `deleteToast` |             | `CustomEvent<string>` |


## Dependencies

### Used by

 - [toast-list](../..)

### Depends on

- [custom-toast](./components/custom-create-toast)
- [simple-toast](./components/simple-toast)

### Graph
```mermaid
graph TD;
  generic-toast --> custom-toast
  generic-toast --> simple-toast
  toast-list --> generic-toast
  style generic-toast fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
