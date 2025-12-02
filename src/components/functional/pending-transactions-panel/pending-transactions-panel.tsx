import { Component, h, Method, State, Watch } from '@stencil/core';
import { ProviderIdleScreen } from 'common/ProviderIdleScreen/ProviderIdleScreen';
import { ANIMATION_DELAY_PROMISE } from 'components/visual/SidePanel/side-panel.constants';
import { SidePanel } from 'components/visual/SidePanel/SidePanel';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';
import { ConnectionMonitor } from 'utils/ConnectionMonitor';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import { PendingTransactionsEventsEnum } from './pending-transactions-panel.types';
import { handleSidePanelOpenChange } from 'components/visual/SidePanel/helpers/handleSidePanelOpenChange';

const getProviderIntroText = (providerType?: IProviderBase['type']) => {
  switch (providerType) {
    case ProviderTypeEnum.extension:
      return 'Check  the MultiversX Browser Extension to connect to your wallet.';
    case ProviderTypeEnum.metamask:
      return 'Open the MetaMask Browser Extension to connect to your wallet.';
    case ProviderTypeEnum.passkey:
      return 'Use your predefined passkey to connect to your wallet.';
    case ProviderTypeEnum.crossWindow:
      return 'Follow the steps on MultiversX Web Wallet to connect to your wallet.';
    default:
      return 'Follow the steps on your selected provider to connect to your wallet.';
  }
};

@Component({
  tag: 'mvx-pending-transactions-panel',
  styleUrl: 'pending-transactions-panel.scss',
  shadow: true,
})
export class PendingTransactionsPanel {
  private readonly eventBus: IEventBus = new EventBus();
  private unsubscribeFunctions: (() => void)[] = [];
  private readonly connectionMonitor = new ConnectionMonitor();

  @State() provider: IProviderBase = null;
  @State() isOpen: boolean = false;
  @State() shouldAnimate = false;

  @Watch('isOpen')
  handleIsOpenChange(isOpen: boolean) {
    handleSidePanelOpenChange(isOpen, (shouldAnimate) => { this.shouldAnimate = shouldAnimate; });
  }

  @Method() async getEventBus() {
    await this.connectionMonitor.waitForConnection();
    return this.eventBus;
  }

  @Method() async closeWithAnimation() {
    this.isOpen = false;
    const animationDelay = await ANIMATION_DELAY_PROMISE;
    return animationDelay;
  }

  componentDidLoad() {
    const unsubDataUpdate = this.eventBus.subscribe(PendingTransactionsEventsEnum.DATA_UPDATE, this.dataUpdate);
    this.unsubscribeFunctions.push(unsubDataUpdate);
    this.connectionMonitor.connect();
  }

  disconnectedCallback() {
    this.resetState();
    this.unsubscribeFunctions.forEach(unsub => unsub());
    this.unsubscribeFunctions = [];
  }

  private resetState() {
    this.provider = null;
    this.isOpen = false;
  }

  private readonly handleClose = () => {
    this.eventBus.publish(PendingTransactionsEventsEnum.CLOSE);
  };

  private readonly dataUpdate = (newData: IProviderBase) => {
    this.provider = newData;
    this.isOpen = true;
  };

  render() {
    return (
      <SidePanel
        shouldAnimate={this.shouldAnimate}
        panelTitle={this?.provider?.name}
        showHeader={false}
      >
        <ProviderIdleScreen
          provider={this.provider}
          onClose={this.handleClose}
          introTitle="Signing Transaction"
          introText={getProviderIntroText(this.provider?.type)}
        >
          <button onClick={this.handleClose}>Close</button>
        </ProviderIdleScreen>
      </SidePanel>
    );
  }
}
