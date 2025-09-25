import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionAccountType } from '../../transactions-table.type';

const transactionAccountClasses: Record<string, string> = {
  explorerLink: 'mvx:text-primary!',
};

@Component({
  tag: 'mvx-transaction-account',
  styleUrl: 'transaction-account.scss',
})
export class TransactionAccount {
  @Prop() account: TransactionAccountType;
  @Prop() class?: string;
  @Prop() dataTestId?: string;
  @Prop() scope: 'receiver' | 'sender';
  @Prop() showLockedAccounts: boolean = false;

  render() {
    const explorerLinkDataTestId =
      this.scope === 'receiver' ? DataTestIdsEnum.receiverLink : DataTestIdsEnum.senderLink;

    return (
      <div class={classNames(this.class, 'transaction-account')} data-testid={this.dataTestId}>
        {this.showLockedAccounts && this.account.isTokenLocked && <Icon name="lock" class="transaction-account-lock" />}
        {this.account.isContract && <Icon class="transaction-account-contract" name="contract" />}

        {this.account.showLink ? (
          <mvx-explorer-link
            link={this.account.link}
            data-testid={explorerLinkDataTestId}
            class={transactionAccountClasses.explorerLink}
          >
            <span>{this.account.address}</span>
          </mvx-explorer-link>
        ) : (
          <mvx-transaction-account-name
            name={this.account.name}
            description={this.account.description}
            address={this.account.address}
          />
        )}
      </div>
    );
  }
}
