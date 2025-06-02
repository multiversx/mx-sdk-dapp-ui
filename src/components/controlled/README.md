# Controlled Components

This directory contains components that are controlled by their parent components through props. These components are built using Stencil.js and focus on displaying data in a consistent format.

## Components

### Format Amount (`mvx-format-amount`)
A component that formats and displays numerical amounts. It handles integer and decimal parts separately, with optional labels and validation states. The component supports custom styling for different parts of the amount.

### Transactions Table (`mvx-transactions-table`)
A table component that displays transaction data in a structured format. It includes columns for transaction hash, age, shard, sender, receiver, method, and value. The table handles different types of transaction data and provides consistent formatting.

## Usage

These components are designed to be controlled by their parent components through props. They handle specific aspects of data display and formatting, such as:
1. Amount formatting and validation
2. Transaction data presentation
3. Account information display
4. Method and value representation

Example usage:
```tsx
<mvx-transactions-table
  transactions={[
    {
      hash: "0x123...",
      age: { timeAgo: "2h ago", tooltip: "2024-03-20 10:00:00" },
      sender: { address: "erd1...", name: "Alice" },
      receiver: { address: "erd2...", name: "Bob" },
      method: { name: "Transfer", actionDescription: "Token transfer" },
      value: {
        valueInteger: "100",
        valueDecimal: ".50",
        egldLabel: "EGLD"
      }
    }
  ]}
/>
```
