# side-panel



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute          | Description                               | Type                                                | Default     |
| ------------------- | ------------------ | ----------------------------------------- | --------------------------------------------------- | ----------- |
| `isOpen`            | `is-open`          | Whether the panel is open                 | `boolean`                                           | `false`     |
| `panelClassName`    | `panel-class-name` | Optional class name for the panel content | `string`                                            | `undefined` |
| `side` _(required)_ | `side`             | Which side the panel slides from          | `SidePanelTypeEnum.LEFT \| SidePanelTypeEnum.RIGHT` | `undefined` |


## Events

| Event   | Description | Type               |
| ------- | ----------- | ------------------ |
| `close` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [notifications-feed](../../functional/notifications-feed)
 - [unlock-panel](../../unlock-panel)

### Graph
```mermaid
graph TD;
  notifications-feed --> side-panel
  unlock-panel --> side-panel
  style side-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
