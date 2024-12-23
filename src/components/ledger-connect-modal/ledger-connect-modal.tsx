import { Component, Prop, h, State, Element, Fragment, Method, forceUpdate } from '@stencil/core';
import { EventBus, IEventBus } from 'utils/EventBus';
import { ILedgerConnectModalData, LedgerConnectEventsEnum } from './ledger-connect-modal.types';
import { renderAccounts } from './helpers/renderAccounts';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'ledger-connect-modal',
  styleUrl: 'ledger-connect-modal.css',
  shadow: true,
})
export class LedgerConnectModal {
  @Element() hostElement: HTMLElement;
  private eventBus: IEventBus = new EventBus();

  @Prop() data: ILedgerConnectModalData = {
    accountScreenData: null,
    confirmScreenData: null,
    connectScreenData: {},
  };

  @Method() async getEventBus() {
    return this.eventBus;
  }

  @State() private selectedIndex = 0;
  @State() private selectedAddress = '';

  render() {
    const { accountScreenData, confirmScreenData, connectScreenData } = this.data;

    if (accountScreenData) {
      const isSelectedIndexOnPage = accountScreenData.accounts.some(({ index }) => index === this.selectedIndex);

      const accountsList =
        accountScreenData.isLoading || accountScreenData.accounts.length === 0 ? (
          <generic-spinner data-testid={DataTestIdsEnum.ledgerLoading}></generic-spinner>
        ) : (
          renderAccounts({
            shownAccounts: accountScreenData.accounts,
            onSelectAccount: this.selectAccount.bind(this),
            selectedIndex: this.selectedIndex,
          })
        );

      return (
        <generic-modal
          modalTitle={<div data-testid={`${DataTestIdsEnum.addressTableContainer}Title`}>Access your wallet</div>}
          modalSubtitle={<div data-testid={`${DataTestIdsEnum.addressTableContainer}SubTitle`}>Choose the wallet you want to access</div>}
          body={
            <Fragment>
              {accountsList}
              {!accountScreenData.isLoading && accountScreenData.accounts.length !== 0 && (
                <Fragment>
                  <div class="navigation">
                    <button onClick={() => this.prevPage()} disabled={accountScreenData.startIndex <= 0} data-testid={DataTestIdsEnum.prevBtn} class="navigation-button">
                      {'< '} Prev
                    </button>
                    <button onClick={() => this.nextPage()} data-testid={DataTestIdsEnum.nextBtn} class="navigation-button">
                      Next{' >'}
                    </button>
                  </div>
                  <button data-testid={DataTestIdsEnum.confirmBtn} class="access-button" onClick={() => this.accessWallet()} disabled={!isSelectedIndexOnPage}>
                    Access Wallet
                  </button>
                </Fragment>
              )}
            </Fragment>
          }
          onClose={() => this.close()}
        />
      );
    }

    if (confirmScreenData) {
      return (
        <generic-modal
          onClose={() => this.close()}
          modalTitle="Confirm"
          modalSubtitle="Confirm Ledger Address"
          body={
            <div data-testid={DataTestIdsEnum.ledgerConfirmAddress} class="ledger-confirm-address-section">
              <div class="ledger-confirm-address-section">
                <div class="ledger-confirm-address-description">{confirmScreenData.confirmAddressText}</div>
                <div class="ledger-confirm-address-header">{confirmScreenData.selectedAddress}</div>
              </div>

              <div class="ledger-confirm-address-section">
                <div class="ledger-confirm-address-description">{confirmScreenData?.authText}</div>
                <div class="ledger-confirm-address-data">{confirmScreenData?.data}</div>
                <div class="ledger-confirm-address-description">{confirmScreenData?.areShownText}</div>
              </div>

              <div class="ledger-confirm-address-footer">
                <div>Select Approve on your device to confirm.</div>

                <div>
                  Or, if it does not match, close this page and{' '}
                  <a href="https://help.multiversx.com/en/" target="_blank" rel="noreferrer">
                    contact support
                  </a>
                  .
                </div>
              </div>
            </div>
          }
        />
      );
    }

    // connectScreenData
    return (
      <generic-modal
        onClose={() => this.close()}
        modalTitle="Connect Ledger"
        modalSubtitle="Unlock your device & open the MultiversX App"
        body={
          <div>
            {connectScreenData?.error && <p>{connectScreenData.error}</p>}
            {connectScreenData?.customContentMarkup && connectScreenData?.customContentMarkup}

            <button
              data-testid={DataTestIdsEnum.ledgerConnectBtn}
              class="access-button"
              onClick={() => this.eventBus.publish(LedgerConnectEventsEnum.CONNECT_DEVICE)}
              disabled={connectScreenData?.disabled}
            >
              Connect Ledger
            </button>
            <a
              href="https://support.ledger.com/hc/en-us/articles/115005165269-Connection-issues-with-Windows-or-Linux"
              target="_blank"
              rel="noopener noreferrer"
              class="connection-link"
            >
              Having connection issues?
            </a>
          </div>
        }
      />
    );
  }

  private accessWallet() {
    this.eventBus.publish(LedgerConnectEventsEnum.ACCESS_WALLET, {
      addressIndex: this.selectedIndex,
      selectedAddress: this.selectedAddress || this.data.accountScreenData?.accounts.find(({ index }) => index === this.selectedIndex)?.address || '',
    });
  }

  private selectAccount(index: number) {
    this.selectedIndex = index;
    this.selectedAddress = this.data.accountScreenData?.accounts.find(({ index }) => index === this.selectedIndex)?.address ?? '';
  }

  async nextPage() {
    this.eventBus.publish(LedgerConnectEventsEnum.NEXT_PAGE);
  }

  async prevPage() {
    this.eventBus.publish(LedgerConnectEventsEnum.PREV_PAGE);
  }

  close(props = { isUserClick: true }) {
    if (props.isUserClick) {
      this.eventBus.publish(LedgerConnectEventsEnum.CLOSE);
    }

    if (this.hostElement && this.hostElement.parentNode) {
      this.hostElement.parentNode.removeChild(this.hostElement);
    }
  }

  private dataUpdate(payload: ILedgerConnectModalData) {
    if (payload.shouldClose) {
      return this.close({ isUserClick: false });
    }
    this.data = { ...payload };
    forceUpdate(this);
  }

  componentDidLoad() {
    this.eventBus.subscribe(LedgerConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }

  disconnectedCallback() {
    this.eventBus.unsubscribe(LedgerConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }
}
