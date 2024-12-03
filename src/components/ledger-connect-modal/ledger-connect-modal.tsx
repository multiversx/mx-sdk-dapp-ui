import { Component, Prop, h, State, Element, Fragment, Method, forceUpdate } from '@stencil/core';
import { EventBus, IEventBus } from 'utils/EventBus';
import { ILedgerConnectModalData, LedgerConnectEventsEnum } from './ledger-connect-modal.types';
import { renderAccounts } from './helpers/renderAccounts';
import { renderInModal } from './helpers/renderInModal';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'ledger-connect-modal',
  styleUrl: 'ledger-connect-modal.css',
  shadow: true,
})
export class LedgerConnectModal {
  @Element() hostElement: HTMLElement;
  private eventBus: IEventBus = EventBus.getInstance();

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
          <div class="spinner" data-testid={DataTestIdsEnum.ledgerLoading}></div>
        ) : (
          renderAccounts({
            shownAccounts: accountScreenData.accounts,
            onSelectAccount: this.selectAccount.bind(this),
            selectedIndex: this.selectedIndex,
          })
        );

      return renderInModal({
        onClose: () => this.close(),
        title: <div data-testid={`${DataTestIdsEnum.addressTableContainer}Title`}>Access your wallet</div>,
        subtitle: <div data-testid={`${DataTestIdsEnum.addressTableContainer}SubTitle`}>Choose the wallet you want to access</div>,
        body: (
          <Fragment>
            {accountsList}
            <div class="navigation">
              <button onClick={() => this.prevPage()} disabled={accountScreenData.startIndex <= 0} data-testid={DataTestIdsEnum.prevBtn}>
                Prev
              </button>
              <button onClick={() => this.nextPage()} data-testid={DataTestIdsEnum.nextBtn}>
                Next
              </button>
            </div>

            <button data-testid={DataTestIdsEnum.confirmBtn} class="access-button" onClick={() => this.accessWallet()} disabled={!isSelectedIndexOnPage}>
              Access Wallet
            </button>
          </Fragment>
        ),
      });
    }

    if (confirmScreenData) {
      return renderInModal({
        onClose: () => this.close(),
        title: 'Confirm',
        subtitle: 'Confirm Ledger Address',
        body: (
          <div data-testid={DataTestIdsEnum.ledgerConfirmAddress} class="ledger-confirm-address-section">
            <div class="ledger-confirm-address-section">
              <div>{confirmScreenData.confirmAddressText}</div>
              <div>{confirmScreenData.selectedAddress}</div>
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
        ),
      });
    }

    // connectScreenData
    return renderInModal({
      onClose: () => this.close(),
      title: 'Connect Ledger',
      subtitle: 'Unlock your device & open the MultiversX App',
      body: (
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
          <a href="https://support.ledger.com/hc/en-us/articles/115005165269-Connection-issues-with-Windows-or-Linux" target="_blank" rel="noopener noreferrer">
            Having connection issues?
          </a>
        </div>
      ),
    });
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
