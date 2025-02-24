import { Component, Element, forceUpdate, h, Method, Prop, State } from '@stencil/core';
import type { IGenericModalProps } from 'common/generic-modal/generic-modal.types';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { ILedgerConnectModalData } from './ledger-connect.types';
import { LedgerConnectEventsEnum } from './ledger-connect.types';
import { LedgerConnectBase } from './LedgerConnectBase';

@Component({
  tag: 'ledger-connect-modal',
  shadow: true,
})
export class LedgerConnectModal {
  @Element() hostElement: HTMLElement;

  @Prop() data: ILedgerConnectModalData = {
    accountScreenData: null,
    confirmScreenData: null,
    connectScreenData: {},
  };

  @State() private selectedIndex = 0;

  private ledgerConnectBase: LedgerConnectBase;

  componentWillLoad() {
    this.ledgerConnectBase = new LedgerConnectBase(this.data);
  }

  @Method() async getEventBus() {
    return this.ledgerConnectBase.getEventBus();
  }

  render() {
    const modalProps = this.getModalProps();

    return <generic-modal {...modalProps} onClose={() => this.close()} />;
  }

  private getModalProps = (): Omit<IGenericModalProps, 'close'> => {
    const { accountScreenData, confirmScreenData, connectScreenData } = this.data;

    if (accountScreenData) {
      return {
        modalTitle: <div data-testid={`${DataTestIdsEnum.addressTableContainer}Title`}>Access your wallet</div>,
        modalSubtitle: <div data-testid={`${DataTestIdsEnum.addressTableContainer}SubTitle`}>Choose the wallet you want to access</div>,
        body: (
          <ledger-account-screen
            accountScreenData={accountScreenData}
            selectedIndex={this.selectedIndex}
            onSelectAccount={(event: CustomEvent) => this.selectAccount(event.detail)}
            onAccessWallet={() => this.accessWallet()}
            onPrevPage={() => this.prevPage()}
            onNextPage={() => this.nextPage()}
          />
        ),
      };
    }

    if (confirmScreenData) {
      return {
        modalTitle: 'Confirm',
        modalSubtitle: 'Confirm Ledger Address',
        body: <ledger-confirm-screen confirmScreenData={confirmScreenData} />,
      };
    }

    return {
      modalTitle: 'Connect Ledger',
      modalSubtitle: 'Unlock your device & open the MultiversX App',
      body: <ledger-connect-screen connectScreenData={connectScreenData} onConnect={() => this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.CONNECT_DEVICE)} />,
    };
  };

  private accessWallet() {
    this.ledgerConnectBase.accessWallet();
  }

  private selectAccount(index: number) {
    this.ledgerConnectBase.selectAccount(index);
    // this is needed for the UI to be reactive
    this.selectedIndex = this.ledgerConnectBase.selectedIndex;
  }

  async nextPage() {
    this.ledgerConnectBase.nextPage();
  }

  async prevPage() {
    this.ledgerConnectBase.prevPage();
  }

  close(props = { isUserClick: true }) {
    if (props.isUserClick) {
      this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.CLOSE);
    }

    if (this.hostElement?.parentNode) {
      this.hostElement.parentNode.removeChild(this.hostElement);
    }
  }

  componentDidLoad() {
    this.ledgerConnectBase.subscribeEventBus({
      closeFn: () => this.close({ isUserClick: false }),
      forceUpdateFn: () => {
        // this is needed for the UI to be reactive
        this.data = this.ledgerConnectBase.data;
        forceUpdate(this);
      },
    });
  }

  disconnectedCallback() {
    this.ledgerConnectBase.unsubscribeEventBus({
      closeFn: () => this.close({ isUserClick: false }),
      forceUpdateFn: () => {
        // this is needed for the UI to be reactive
        this.data = this.ledgerConnectBase.data;
        forceUpdate(this);
      },
    });
  }
}
