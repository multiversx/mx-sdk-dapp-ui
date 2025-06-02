# Functional Components

This directory contains components that handle specific application functionality and business logic. These components are built using Stencil.js and integrate with the application's event system.

## Components

### Sign Transactions Panel (`mvx-sign-transactions-panel`)
A panel component that handles transaction signing workflows. It displays transaction details, including amounts, recipients, and network fees. The component manages the transaction signing process and provides navigation controls for multi-transaction flows.

### Notifications Feed (`mvx-notifications-feed`)
A feed component that displays transaction notifications and activity history. It shows pending transactions and completed transactions, with options to clear the history. The feed is stored in the browser and resets with new sessions.

### Wallet Connect (`mvx-wallet-connect`)
A component that handles wallet connection flows. It provides a QR code scanner for connecting to external wallets and manages the connection state. The component includes navigation between different connection methods.

### Unlock Panel (`mvx-unlock-panel`)
A panel component that handles wallet unlocking and authentication. It supports multiple authentication methods and manages the login state. The component includes an introduction screen and footer with wallet creation information.

### Toast List (`mvx-toast-list`)
A component that manages and displays toast notifications. It supports different types of toasts, including transaction notifications and custom component toasts. The component handles toast lifecycle and positioning.

### Ledger Connect (`mvx-ledger-connect`)
A component that handles Ledger hardware wallet connections. It displays available Ledger addresses and manages the connection process. The component includes loading states and address selection functionality.

## Usage

These components are integrated with the application's event system and state management. They handle specific user interactions and business processes, such as:
1. Transaction signing and confirmation
2. Wallet connection and authentication
3. Notification management
4. Hardware wallet integration

Example usage:
```tsx
<mvx-sign-transactions-panel
  isOpen={true}
  onClose={() => handleClose()}
  onConfirm={() => handleConfirm()}
>
  <mvx-sign-transactions-overview
    amount="100"
    identifier="EGLD"
    usdValue="$50"
    interactor="erd1..."
  />
</mvx-sign-transactions-panel>
```
