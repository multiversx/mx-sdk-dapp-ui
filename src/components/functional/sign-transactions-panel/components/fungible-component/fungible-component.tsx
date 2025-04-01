import { Component, h } from '@stencil/core';
import { NftEnumType } from 'types/tokens.types';

import state from '../../signTransactionsPanelStore';

const LABELS = {
  [NftEnumType.SemiFungibleESDT]: 'SFT',
  [NftEnumType.NonFungibleESDT]: 'NFT',
};

@Component({
  tag: 'mvx-fungible-component',
  styleUrl: 'fungible-component.css',
})
export class FungibleComponent {
  render() {
    const { sftTransaction, nftTransaction, commonData } = state;
    const { tokenType } = commonData;

    const data = tokenType === NftEnumType.SemiFungibleESDT ? sftTransaction : nftTransaction;
    const { amount = '', identifier = '', imageURL = '' } = data || {};

    const label = LABELS[tokenType];
    return (
      <mvx-sign-transaction-component
        header={
          <div class="fungible-container">
            <span>{`You are sending ${amount} ${label}`}</span>
            <div class="fungible-inner-container">
              <div class="fungible-img-container">
                <img src={imageURL} alt={identifier} class="fungible-img" />
                <div>
                  <span>{identifier}</span>
                </div>
              </div>

              <span class="fungible-sft">{label}</span>
            </div>
          </div>
        }
      ></mvx-sign-transaction-component>
    );
  }
}
