import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { Component, Prop, h } from '@stencil/core';
import { ITransactionAccount } from '../../transactions-table.type';

@Component({
  tag: 'transaction-account',
  styleUrl: 'transaction-account.css',
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
        {this.showLockedAccounts && this.account.isTokenLocked && <fontawesome-icon icon={faLock} description={this.account.name}></fontawesome-icon>}

        {this.account.isContract && <fontawesome-icon icon={faFileAlt} description="Smart Contract"></fontawesome-icon>}

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
