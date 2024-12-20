import { Component, h } from '@stencil/core';
import state from '../../sign-transactions-modal-store';

@Component({
  tag: 'token-component',
  shadow: false,
})
export class TokenComponent {
  render() {
    const { tokenAmount, egldLabel, usdValue } = state;

    return (
      <sign-transaction-component
        header={<balance-component amount={tokenAmount} ticker={egldLabel} usdValue={usdValue} header="You are sending"></balance-component>}
      ></sign-transaction-component>
    );
  }
}
