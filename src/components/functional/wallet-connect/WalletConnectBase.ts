import QRCode from 'qrcode';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { IWalletConnectPanelData } from './wallet-connect.types';
import { WalletConnectEventsEnum } from './wallet-connect.types';

interface IWalletConnectEventBusProps {
  forceUpdateFn: () => void;
  closeFn: () => void;
}

interface IWalletConnectDataUpdateProps extends IWalletConnectEventBusProps {
  payload: IWalletConnectPanelData;
}

export class WalletConnectBase {
  eventBus: IEventBus = new EventBus();

  constructor(public data: IWalletConnectPanelData) {}

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

  subscribeEventBus({ closeFn, forceUpdateFn }: IWalletConnectEventBusProps) {
    this.eventBus.subscribe(WalletConnectEventsEnum.DATA_UPDATE, (payload: IWalletConnectPanelData) => this.dataUpdate({ payload, closeFn, forceUpdateFn }));
  }

  unsubscribeEventBus({ closeFn, forceUpdateFn }: IWalletConnectEventBusProps) {
    this.eventBus.unsubscribe(WalletConnectEventsEnum.DATA_UPDATE, (payload: IWalletConnectPanelData) => this.dataUpdate({ payload, closeFn, forceUpdateFn }));
  }

  private dataUpdate({ payload, forceUpdateFn }: IWalletConnectDataUpdateProps) {
    this.data = { ...payload };
    forceUpdateFn();
  }
}
