import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import { getLedgerAddressByIndex } from './helpers/getLedgerAddressByIndex';
import type { ILedgerConnectModalData } from './ledger-connect.types';
import { LedgerConnectEventsEnum } from './ledger-connect.types';

export class LedgerConnectBase {
  eventBus: IEventBus = new EventBus();
  selectedIndex = 0;
  selectedAddress = '';

  constructor(public data: ILedgerConnectModalData) {}

  getEventBus() {
    return this.eventBus;
  }

  accessWallet() {
    this.eventBus.publish(LedgerConnectEventsEnum.ACCESS_WALLET, {
      addressIndex: this.selectedIndex,
      selectedAddress: this.selectedAddress || getLedgerAddressByIndex({ accounts: this.data.accountScreenData?.accounts, selectedIndex: this.selectedIndex }),
    });
  }

  selectAccount(index: number) {
    this.selectedIndex = index;
    this.selectedAddress = getLedgerAddressByIndex({ accounts: this.data.accountScreenData?.accounts, selectedIndex: this.selectedIndex });
  }

  nextPage() {
    this.eventBus.publish(LedgerConnectEventsEnum.NEXT_PAGE);
  }

  prevPage() {
    this.eventBus.publish(LedgerConnectEventsEnum.PREV_PAGE);
  }

  subscribeEventBus({ closeFn, forceUpdateFn }: { forceUpdateFn: () => void; closeFn: () => void }) {
    this.eventBus.subscribe(LedgerConnectEventsEnum.DATA_UPDATE, (payload: ILedgerConnectModalData) => this.dataUpdate({ payload, closeFn, forceUpdateFn }));
  }

  unsubscribeEventBus({ closeFn, forceUpdateFn }: { forceUpdateFn: () => void; closeFn: () => void }) {
    this.eventBus.unsubscribe(LedgerConnectEventsEnum.DATA_UPDATE, (payload: ILedgerConnectModalData) => this.dataUpdate({ payload, closeFn, forceUpdateFn }));
  }

  private dataUpdate({ payload, closeFn, forceUpdateFn }: { payload: ILedgerConnectModalData; forceUpdateFn: () => void; closeFn: () => void }) {
    if (payload.shouldClose) {
      return closeFn();
    }
    this.data = { ...payload };
    forceUpdateFn();
  }
}
