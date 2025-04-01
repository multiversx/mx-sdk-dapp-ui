import { Component, h } from '@stencil/core';

import state from '../../signTransactionsPanelStore';

@Component({
  tag: 'mvx-token-component',
})
export class TokenComponent {
  render() {
    const { tokenTransaction } = state;
    const { amount, identifier, usdValue } = tokenTransaction || {};

    return (
      <mvx-sign-transaction-component
        header={<mvx-balance-component amount={amount} ticker={identifier} usdValue={usdValue} header="You are sending"></mvx-balance-component>}
      ></mvx-sign-transaction-component>
    );
  }
}
