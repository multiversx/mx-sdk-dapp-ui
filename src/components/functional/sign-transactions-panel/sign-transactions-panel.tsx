import { Component, h, Method, State, Watch } from '@stencil/core';
import { getCopyClickAction } from 'common/CopyButton/getCopyClickAction';
import { ANIMATION_DELAY_PROMISE } from 'components/visual/SidePanel/side-panel.constants';
import { SidePanel } from 'components/visual/SidePanel/SidePanel';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { ConnectionMonitor } from 'utils/ConnectionMonitor';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import { SignTransactionsAdvanced } from './components/SignTransactionsAdvanced/SignTransactionsAdvanced';
import { SignTransactionsFooter } from './components/SignTransactionsFooter/SignTransactionsFooter';
import { SignTransactionsHeader } from './components/SignTransactionsHeader/SignTransactionsHeader';
import { SignTransactionsOverview } from './components/SignTransactionsOverview/SignTransactionsOverview';
import styles from './sign-transactions-panel.styles';
import type { IOverviewProps, ISignTransactionsPanelData } from './sign-transactions-panel.types';
import { DecodeMethodEnum, SignEventsEnum, TransactionTabsEnum } from './sign-transactions-panel.types';
import state, { resetState } from './signTransactionsPanelStore';
import { handleSidePanelOpenChange } from 'components/visual/SidePanel/helpers/handleSidePanelOpenChange';

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
  @State() showFavicon: boolean = true;
  @State() decodeMethod: DecodeMethodEnum = DecodeMethodEnum.raw;
  @State() decodeTooltipVisible: boolean = false;
  @State() shouldAnimate = false;

  @Watch('isOpen')
  handleIsOpenChange(isOpen: boolean) {
    handleSidePanelOpenChange(isOpen, (shouldAnimate) => { this.shouldAnimate = shouldAnimate; });
  }

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

  private handleCopyButtonClick = getCopyClickAction({
    onSuccessChange: isSuccess => (this.isSuccessOnCopy = isSuccess),
  });

  private setDecodeMethod = (method: DecodeMethodEnum) => {
    this.decodeMethod = method;
  };

  private setDecodeTooltipVisible = (isVisible: boolean) => {
    this.decodeTooltipVisible = isVisible;
  };

  render() {
    const transactionTabs = Object.values(TransactionTabsEnum);

    const { commonData, onBack, onNext } = state;
    const { currentIndex, transactionsCount, origin } = commonData;

    return (
      <SidePanel
        shouldAnimate={this.shouldAnimate}
        onClose={this.handleClose}
        panelTitle="Confirm Transaction"
        hasBackButton={false}
      >
        <div class={styles.signTransactionsPanel} data-testid={DataTestIdsEnum.signTransactionsPanel}>
          <SignTransactionsHeader
            onBack={onBack}
            onNext={onNext}
            currentIndex={currentIndex}
            transactionsCount={transactionsCount}
            origin={origin}
            showFavicon={this.showFavicon}
          />

          <div class={styles.signTransactionContent}>
            <div class={styles.signTransactionsTabs}>
              {transactionTabs.map(transactionTab => (
                <div
                  class={{
                    [styles.signTransactionsTab]: true,
                    [styles.signTransactionsTabActive]: transactionTab === this.activeTab,
                  }}
                  data-testid={`${DataTestIdsEnum.signTransactionsTab}-${transactionTab.toLowerCase()}`}
                  onClick={() => this.setActiveTab(transactionTab)}
                >
                  <div class={styles.signTransactionsTabText} data-testid={DataTestIdsEnum.signTransactionsTabText}>
                    {transactionTab}
                  </div>
                </div>
              ))}
            </div>

            {this.activeTab === TransactionTabsEnum.overview ? (
              <SignTransactionsOverview {...this.overviewProps} />
            ) : (
              <SignTransactionsAdvanced
                decodeMethod={this.decodeMethod}
                onDecodeMethodChange={this.setDecodeMethod}
                decodeTooltipVisible={this.decodeTooltipVisible}
                onDecodeTooltipVisibilityChange={this.setDecodeTooltipVisible}
              />
            )}
          </div>

          <SignTransactionsFooter
            tooltipVisible={this.isFooterTooltipVisible}
            onTooltipVisibilityChange={this.handleIsFooterTooltipVisible}
            isSuccessOnCopy={this.isSuccessOnCopy}
            handleCopyButtonClick={this.handleCopyButtonClick}
          />
        </div>
      </SidePanel>
    );
  }
}
