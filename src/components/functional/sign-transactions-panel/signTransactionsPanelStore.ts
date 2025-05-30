import { createStore } from '@stencil/store';
import type { ISignTransactionsPanelData } from 'components/functional/sign-transactions-panel/sign-transactions-panel.types';

interface ITransactionState extends ISignTransactionsPanelData {
  isWaitingForSignature: boolean;
  onCancel: () => void;
  onBack: () => void;
  onNext: () => void;
  onConfirm: () => void;
  setPpuOption: (ppu: number) => void;
}

const initialState: ITransactionState = {
  isWaitingForSignature: false,
  commonData: {
    data: '',
    gasLimit: '',
    gasPrice: '',
    transactionsCount: 0,
    egldLabel: '',
    feeLimit: '',
    feeInFiatLimit: '',
    currentIndex: 0,
    currentIndexToSign: 0,
    receiver: '',
    ppuOptions: [],
    origin: '',
  },
  nftTransaction: null,
  sftTransaction: null,
  tokenTransaction: null,
  onCancel: null,
  onBack: null,
  onNext: null,
  onConfirm: null,
  setPpuOption: null,
};

const store = createStore<ITransactionState>({
  ...initialState,
});

/*
  All components using `state` must be included in
  `excludeComponents` under `stencil.config.ts`
*/
const state = store.state;

export const resetState = () => {
  Object.assign(state, initialState);
};

export default state;
