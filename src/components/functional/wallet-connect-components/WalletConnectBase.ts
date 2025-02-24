import QRCode from 'qrcode';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { IWalletConnectModalData } from './wallet-connect-modal.types';
import { WalletConnectEventsEnum } from './wallet-connect-modal.types';

export class WalletConnectBase {
  eventBus: IEventBus = new EventBus();

  constructor(public data: IWalletConnectModalData) {}

  getEventBus() {
    return this.eventBus;
  }

  async generateSVG(wcURI: string) {
    try {
      const svg = await QRCode.toString(wcURI, {
        type: 'svg',
      });
      return svg;
    } catch (error) {
      console.error('Error generating QR Code:', error);
      return '';
    }
  }

  subscribeEventBus({ closeFn, forceUpdateFn }: { forceUpdateFn: () => void; closeFn: () => void }) {
    this.eventBus.subscribe(WalletConnectEventsEnum.DATA_UPDATE, (payload: IWalletConnectModalData) => this.dataUpdate({ payload, closeFn, forceUpdateFn }));
  }

  unsubscribeEventBus({ closeFn, forceUpdateFn }: { forceUpdateFn: () => void; closeFn: () => void }) {
    this.eventBus.unsubscribe(WalletConnectEventsEnum.DATA_UPDATE, (payload: IWalletConnectModalData) => this.dataUpdate({ payload, closeFn, forceUpdateFn }));
  }

  private dataUpdate({ payload, closeFn, forceUpdateFn }: { payload: IWalletConnectModalData; forceUpdateFn: () => void; closeFn: () => void }) {
    if (payload.shouldClose) {
      return closeFn();
    }
    this.data = { ...payload };
    forceUpdateFn();
  }
}
