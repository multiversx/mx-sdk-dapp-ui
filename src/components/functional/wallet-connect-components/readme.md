# wallet-connect-modal

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type                      | Default                |
| -------- | --------- | ----------- | ------------------------- | ---------------------- |
| `data`   | --        |             | `IWalletConnectModalData` | `{     wcURI: '',   }` |

## Methods

### `getEventBus() => Promise<IEventBus>`

#### Returns

Type: `Promise<IEventBus>`

## Dependencies

### Depends on

- [generic-modal](../../../common/generic-modal)
- [generic-spinner](../../../common/generic-spinner)

### Graph

```mermaid
graph TD;
  wallet-connect-modal --> generic-modal
  wallet-connect-modal --> generic-spinner
  style wallet-connect-modal fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
