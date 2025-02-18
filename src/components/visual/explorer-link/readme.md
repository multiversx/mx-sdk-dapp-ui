# explorer-link



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute      | Description | Type             | Default     |
| ------------ | -------------- | ----------- | ---------------- | ----------- |
| `class`      | `class`        |             | `string`         | `undefined` |
| `dataTestId` | `data-test-id` |             | `string`         | `undefined` |
| `icon`       | --             |             | `IconDefinition` | `undefined` |
| `link`       | `link`         |             | `string`         | `undefined` |
| `text`       | `text`         |             | `string`         | `undefined` |


## Dependencies

### Used by

 - [transaction-account](../../controlled/transactions-table/components/transaction-account)
 - [transaction-hash](../../controlled/transactions-table/components/transaction-hash)
 - [transaction-shards](../../controlled/transactions-table/components/transaction-shards)
 - [transaction-toast-details-body](../../functional/toasts-list/components/transaction-toast/components/transaction-toast-details/components)
 - [transaction-value](../../controlled/transactions-table/components/transaction-value)

### Depends on

- [fa-icon](../fa-icon)

### Graph
```mermaid
graph TD;
  explorer-link --> fa-icon
  transaction-account --> explorer-link
  transaction-hash --> explorer-link
  transaction-shards --> explorer-link
  transaction-toast-details-body --> explorer-link
  transaction-value --> explorer-link
  style explorer-link fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
