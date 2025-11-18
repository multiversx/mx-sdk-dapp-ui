import { Component, h, Method, State } from '@stencil/core';
import { ANIMATION_DELAY_PROMISE } from 'components/visual/side-panel/side-panel.constants';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { ConnectionMonitor } from 'utils/ConnectionMonitor';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { IOverviewProps, ISignTransactionsPanelData } from './sign-transactions-panel.types';
import { SignEventsEnum, TransactionTabsEnum } from './sign-transactions-panel.types';
import state, { resetState } from './signTransactionsPanelStore';
import { SignTransactionsFooter } from './components/SignTransactionsFooter/SignTransactionsFooter';
import { CopyButtonHandler } from 'common/CopyButton/CopyButtonHandler';

// prettier-ignore
const styles = {
  button: 'button mvx:flex mvx:items-center mvx:justify-center mvx:font-bold mvx:leading-none mvx:px-4 mvx:max-h-full mvx:rounded-xl mvx:cursor-pointer mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:gap-2',
  buttonLarge: 'button-large mvx:h-12 mvx:text-base mvx:px-6',
  buttonSmall: 'button-small mvx:h-10 mvx:text-xs mvx:rounded-xl',
  buttonPrimary: 'button-primary mvx:text-button-primary mvx:bg-button-bg-primary mvx:border mvx:border-button-bg-primary',
  buttonSecondary: 'button-secondary mvx:relative mvx:text-button-secondary mvx:border mvx:border-transparent mvx:after:absolute mvx:after:inset-0 mvx:after:rounded-lg mvx:after:opacity-40 mvx:after:transition-all mvx:after:duration-200 mvx:after:ease-in-out mvx:after:bg-button-bg-secondary mvx:after:content-[""] mvx:after:-z-1 mvx:hover:opacity-100 mvx:hover:text-button-primary mvx:hover:after:opacity-100 mvx:hover:after:bg-button-bg-primary',
  buttonSecondarySmall: 'button-secondary-small mvx:after:rounded-xl',
  buttonNeutral: 'button-neutral mvx:text-neutral-925 mvx:bg-white mvx:hover:opacity-75',
  buttonDisabled: 'button-disabled mvx:pointer-events-none mvx:bg-transparent mvx:cursor-default mvx:border mvx:border-secondary-text mvx:!text-secondary-text mvx:hover:opacity-100'
} satisfies Record<string, string>;

@Component({
  tag: 'mvx-sign-transactions-panel',
  styleUrl: 'sign-transactions-panel.scss',
  shadow: true,
})
export class SignTransactionsPanel {
  private readonly eventBus: IEventBus = new EventBus();
  private unsubscribeFunctions: (() => void)[] = [];
  private readonly connectionMonitor = new ConnectionMonitor();

  @Method() async closeWithAnimation() {
    this.isOpen = false;
    const animationDelay = await ANIMATION_DELAY_PROMISE;
    return animationDelay;
  }

  @State() isOpen: boolean = false;
  @State() activeTab: TransactionTabsEnum = TransactionTabsEnum.overview;
  @State() isFooterTooltipVisible: boolean = false;
  @State() isSuccessOnCopy: boolean = false;

  @Method() async getEventBus() {
    await this.connectionMonitor.waitForConnection();
    return this.eventBus;
  }

  componentWillLoad() {
    state.onCancel = () => {
      this.handleClose();
    };

    state.onNext = () => {
      this.eventBus.publish(SignEventsEnum.NEXT);
    };

    state.onConfirm = () => {
      this.eventBus.publish(SignEventsEnum.CONFIRM);
    };

    state.onBack = () => {
      this.eventBus.publish(SignEventsEnum.BACK);
    };

    state.setGasPriceOption = (gasPriceOption: number) => {
      this.eventBus.publish(SignEventsEnum.SET_GAS_PRICE_OPTION, gasPriceOption);
    };
  }

  componentDidLoad() {
    const unsubDataUpdate = this.eventBus.subscribe(SignEventsEnum.DATA_UPDATE, this.dataUpdate);
    const unsubBack = this.eventBus.subscribe(SignEventsEnum.BACK, this.handleBack);
    this.unsubscribeFunctions.push(unsubDataUpdate, unsubBack);
    this.connectionMonitor.connect();
  }

  disconnectedCallback() {
    resetState();
    this.isOpen = false;
    this.unsubscribeFunctions.forEach(unsub => unsub());
    this.unsubscribeFunctions = [];
  }

  private readonly handleClose = () => {
    this.isOpen = false;
    resetState();
    this.eventBus.publish(SignEventsEnum.CLOSE);
  };

  private readonly dataUpdate = (payload: ISignTransactionsPanelData) => {
    this.isOpen = true;

    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = payload[key];
      }
    }

    state.isWaitingForSignature = false;
  };

  private setActiveTab(tab: TransactionTabsEnum) {
    this.activeTab = tab;
  }

  private readonly handleBack = () => {
    if (state.commonData.currentIndex > 0) {
      state.commonData.currentIndex -= 1;
    }
  };

  get overviewProps(): IOverviewProps {
    const { tokenTransaction, sftTransaction, nftTransaction } = state;
    const txData = sftTransaction || nftTransaction || tokenTransaction;

    return {
      identifier: txData?.identifier,
      usdValue: tokenTransaction?.usdValue,
      amount: txData?.amount || '0',
      tokenIconUrl: txData?.imageURL,
      interactor: state.commonData?.receiver,
      interactorIconUrl: state.commonData?.receiverIcon,
      action: state.commonData?.scCall,
      networkFee: state.commonData?.feeInFiatLimit,
      isApp: Boolean(state.commonData?.scCall),
    };
  }

  private handleIsFooterTooltipVisible = (isTooltipVisible: boolean) => {
    this.isFooterTooltipVisible = isTooltipVisible;
  };

  private handleCopyButtonClick = CopyButtonHandler({
    onSuccessChange: (isSuccess) => (this.isSuccessOnCopy = isSuccess),
  });

  render() {
    console.log(styles) //TODO: remove this
    const transactionTabs = Object.values(TransactionTabsEnum);

    const { commonData } = state;
    const { data, highlight } = commonData;

    return (
      <mvx-side-panel
        isOpen={this.isOpen}
        onClose={this.handleClose}
        panelTitle="Confirm Transaction"
        hasBackButton={false}
      >
        <div class="sign-transactions-panel" data-testid={DataTestIdsEnum.signTransactionsPanel}>
          <mvx-sign-transactions-header />

          <div class="sign-transaction-content">
            <div class="sign-transactions-tabs">
              {transactionTabs.map(transactionTab => (
                <div
                  class={{ 'sign-transactions-tab': true, 'active': transactionTab === this.activeTab }}
                  data-testid={`${DataTestIdsEnum.signTransactionsTab}-${transactionTab.toLowerCase()}`}
                  onClick={() => this.setActiveTab(transactionTab)}
                >
                  <div class="sign-transactions-tab-text" data-testid={DataTestIdsEnum.signTransactionsTabText}>
                    {transactionTab}
                  </div>
                </div>
              ))}
            </div>

            {this.activeTab === TransactionTabsEnum.overview ? (
              <mvx-sign-transactions-overview style={{ width: '100%' }} {...this.overviewProps} />
            ) : (
              <mvx-sign-transactions-advanced style={{ width: '100%' }} data={data} highlight={highlight} />
            )}
          </div>

          <SignTransactionsFooter
            tooltipVisible={this.isFooterTooltipVisible}
            onTooltipVisibilityChange={this.handleIsFooterTooltipVisible}
            isSuccessOnCopy={this.isSuccessOnCopy}
            handleCopyButtonClick={this.handleCopyButtonClick}
          />
        </div>
      </mvx-side-panel>
    );
  }
}
