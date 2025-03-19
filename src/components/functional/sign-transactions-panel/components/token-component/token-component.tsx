import { Component, h } from '@stencil/core';

import state from '../../signTransactionsPanelStore';

@Component({
  tag: 'token-component',
  shadow: false,
})
export class TokenComponent {
  render() {
    const { tokenTransaction } = state;
    const { amount, identifier, usdValue } = tokenTransaction || {};

    return (
      <sign-transaction-component
        header={<balance-component amount={amount} ticker={identifier} usdValue={usdValue} header="You are sending"></balance-component>}
      ></sign-transaction-component>
    );
  }
}
