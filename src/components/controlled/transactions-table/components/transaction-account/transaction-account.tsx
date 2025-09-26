import { Component, h, Prop } from '@stencil/core';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionAccountType } from '../../transactions-table.type';

// prettier-ignore
const styles = {
  transactionAccount: 'transaction-account mvx:flex mvx:items-center mvx:gap-2',
  transactionAccountExplorerLink: 'transaction-account-explorer-link mvx:text-primary!'
} satisfies Record<string, string>;

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
      <div
        data-testid={this.dataTestId}
        class={{ [styles.transactionAccount]: true, [this.class]: Boolean(this.class) }}
      >
        {this.showLockedAccounts && this.account.isTokenLocked && <Icon name="lock" />}
        {this.account.isContract && <Icon name="contract" />}

        {this.account.showLink ? (
          <mvx-explorer-link
            link={this.account.link}
            data-testid={explorerLinkDataTestId}
            class={styles.transactionAccountExplorerLink}
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
