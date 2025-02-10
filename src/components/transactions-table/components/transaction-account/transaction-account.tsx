import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

import type { ITransactionAccount } from '../../transactions-table.type';

@Component({
  tag: 'transaction-account',
  styleUrl: 'transaction-account.css',
  shadow: true,
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
        {this.showLockedAccounts && this.account.isTokenLocked && <fa-icon icon={faLock} description={this.account.name}></fa-icon>}

        {this.account.isContract && <fa-icon icon={faFileAlt} description="Smart Contract"></fa-icon>}

        {this.account.showLink ? (
          <explorer-link link={this.account.link} data-testid={`${this.scope}Link`}>
            <transaction-account-name slot="content" name={this.account.name} description={this.account.description} address={this.account.address}></transaction-account-name>
          </explorer-link>
        ) : (
          <transaction-account-name name={this.account.name} description={this.account.description} address={this.account.address}></transaction-account-name>
        )}
      </div>
    );
  }
}
