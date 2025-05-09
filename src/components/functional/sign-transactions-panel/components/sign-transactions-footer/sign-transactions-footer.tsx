import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-sign-transactions-footer',
  styleUrl: 'sign-transactions-footer.scss',
  shadow: true,
})
export class SignTransactionsFooter {
  @Prop() address: string;

  render() {
    return (
      <div class="sign-transactions-footer">
        <div class="sign-transactions-footer-buttons">
          <button class={{ 'sign-transactions-footer-button': true, 'cancel': true }}>Cancel</button>
          <button class={{ 'sign-transactions-footer-button': true, 'confirm': true }}>Confirm</button>
        </div>

        <div class="sign-transactions-footer-identity">
          <div class="sign-transactions-footer-identity-label">Sign in with</div>
          <mvx-copy-button text={this.address} class="sign-transactions-footer-identity-copy" iconClass="sign-transactions-footer-identity-copy-icon" />
          <mvx-explorer-link link={this.address} class="sign-transactions-footer-identity-explorer" iconClass="sign-transactions-footer-identity-explorer-icon" />
        </div>
      </div>
    );
  }
}
