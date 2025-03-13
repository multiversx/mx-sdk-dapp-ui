# unlock-header



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute | Description | Type             | Default     |
| ----------- | --------- | ----------- | ---------------- | ----------- |
| `backIcon`  | --        |             | `IconDefinition` | `undefined` |
| `closeIcon` | --        |             | `IconDefinition` | `faTimes`   |
| `text`      | `text`    |             | `string`         | `undefined` |


## Events

| Event   | Description | Type                |
| ------- | ----------- | ------------------- |
| `back`  |             | `CustomEvent<void>` |
| `close` |             | `CustomEvent<void>` |


## Dependencies

### Used by

 - [unlock-panel](../..)

### Depends on

- [fa-icon](../../../fa-icon)

### Graph
```mermaid
graph TD;
  unlock-header --> fa-icon
  unlock-panel --> unlock-header
  style unlock-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
