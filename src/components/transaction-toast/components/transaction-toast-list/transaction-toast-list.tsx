import { Component, h } from '@stencil/core';

@Component({
  tag: 'transaction-toast-list',
  styleUrl: 'transaction-toast-list.css',
})
export class TransactionToastList {
  render() {
    return <div class="transaction-list" id="transaction-list"></div>;
  }
}
