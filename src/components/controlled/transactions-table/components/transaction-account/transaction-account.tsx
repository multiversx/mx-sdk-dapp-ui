import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

import type { ITransactionAccount } from '../../transactions-table.type';

@Component({
  tag: 'mvx-transaction-account',
  styleUrl: 'transaction-account.css',
})
export class TransactionAccount {
  @Prop() account: ITransactionAccount;
  @Prop() class?: string;
  @Prop() dataTestId?: string;
  @Prop() scope: 'receiver' | 'sender';
  @Prop() showLockedAccounts: boolean = false;

  render() {
    return (
      <div class={classNames(this.class, 'transaction-account')} data-testid={this.dataTestId}>
        {this.showLockedAccounts && this.account.isTokenLocked && <mvx-fa-icon icon={faLock} description={this.account.name}></mvx-fa-icon>}

        {this.account.isContract && <mvx-fa-icon icon={faFileAlt} description="Smart Contract"></mvx-fa-icon>}

        {this.account.showLink ? (
          <mvx-explorer-link link={this.account.link} data-testid={`${this.scope}Link`}>
            <mvx-transaction-account-name
              slot="content"
              name={this.account.name}
              description={this.account.description}
              address={this.account.address}
            ></mvx-transaction-account-name>
          </mvx-explorer-link>
        ) : (
          <mvx-transaction-account-name name={this.account.name} description={this.account.description} address={this.account.address}></mvx-transaction-account-name>
        )}
      </div>
    );
  }
}
