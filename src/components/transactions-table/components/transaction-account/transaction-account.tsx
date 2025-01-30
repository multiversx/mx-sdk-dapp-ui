import { Component, Prop, h } from '@stencil/core';
import { ITransactionAccount } from '../../transactions-table.type';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';

@Component({
  tag: 'transaction-account',
  shadow: true,
})
export class TransactionAccount {
  @Prop() account: ITransactionAccount;
  @Prop() class?: string = 'transaction-account';
  @Prop() dataTestId?: string;
  @Prop() scope: 'receiver' | 'sender';
  @Prop() showLockedAccounts: boolean = false;

  render() {
    return (
      <div class={this.class} data-testid={this.dataTestId}>
        {this.showLockedAccounts && this.account.isTokenLocked && <fa-icon icon={faLock} description={this.account.name}></fa-icon>}

        {this.account.isContract && <fa-icon icon={faFileAlt} description="Smart Contract"></fa-icon>}

        {this.account.showLink ? (
          <explorer-link link={this.account.link} data-testid={`${this.scope}Link`}>
            <transaction-account-name name={this.account.name} description={this.account.description}></transaction-account-name>
          </explorer-link>
        ) : (
          <transaction-account-name name={this.account.name} description={this.account.description}></transaction-account-name>
        )}
      </div>
    );
  }
}
