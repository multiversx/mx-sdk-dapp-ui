import { Component, h } from '@stencil/core';
import state from '../../signTransactionsPanelStore';

@Component({
  tag: 'mvx-transaction-details',
  styleUrl: 'transaction-details.css',
})
export class TransactionDetails {
  getTransactionData() {
    const { tokenTransaction, sftTransaction, nftTransaction } = state;
    const data = sftTransaction || nftTransaction || tokenTransaction;

    return {
      ...data,
      usdValue: tokenTransaction?.usdValue || '',
    };
  }

  render() {
    const { commonData, tokenTransaction } = state;
    const { receiver, feeLimit, scCall, data, highlight, gasLimit, gasPrice, ppu, isEditable, ppuOptions, feeInFiatLimit } = commonData;
    const { amount } = this.getTransactionData();

    console.log('tokenTransaction', tokenTransaction);
    console.log('commonData', commonData);

    return (
      <div class="transaction-details">
        <mvx-amount-row amount={amount} />

        <mvx-network-fee-row
          feeLimit={feeLimit}
          gasPrice={gasPrice}
          gasLimit={gasLimit}
          ppu={ppu}
          ppuOptions={ppuOptions}
          isEditable={isEditable}
          feeInFiatLimit={feeInFiatLimit}
          onSetPpu={event => state.onSetPpu(parseInt(event.detail, 10))}
        />

        <mvx-receiver-row receiver={receiver} />

        <mvx-sc-call-row scCall={scCall} />

        <mvx-data-row data={data} highlight={highlight} />
      </div>
    );
  }
}
