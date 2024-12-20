import { Component, h } from '@stencil/core';
import state from '../../sign-transactions-modal-store';

const LABELS = {
  SemiFungibleESDT: 'SFT',
  NonFungibleESDT: 'NFT',
};

@Component({
  tag: 'fungible-component',
  styleUrl: 'fungible-component.css',
  shadow: false,
})
export class FungibleComponent {
  render() {
    const { tokenAmount, tokenImageUrl, tokenType, identifier } = state;

    const label = LABELS[tokenType];
    return (
      <sign-transaction-component
        header={
          <div class="fungible-container">
            <span>{`You are sending ${tokenAmount} ${label}`}</span>
            <div class="fungible-inner-container">
              <div class="fungible-img-container">
                <img src={tokenImageUrl} alt={identifier} class="fungible-img" />
                <div>
                  <span>{identifier}</span>
                </div>
              </div>

              <span class="fungible-sft">{label}</span>
            </div>
          </div>
        }
      ></sign-transaction-component>
    );
  }
}
