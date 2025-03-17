import { createStore } from '@stencil/store';
import type { ISignTransactionsModalData } from 'components/functional/sign-transactions-modal/sign-transactions-modal.types';

type ITransactionState = ISignTransactionsModalData & {
  isLoading: boolean;
  isWaitingForSignature: boolean;
  onCancel: () => void;
  onBack: () => void;
  onConfirm: () => void;
  onSetPpu: (ppu: number) => void;
};

const initialState: ITransactionState = {
  isLoading: true,
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
    receiver: '',
    ppuOptions: [],
  },
  nftTransaction: null,
  sftTransaction: null,
  tokenTransaction: null,
  onCancel: null,
  onBack: null,
  onConfirm: null,
  onSetPpu: null,
};

const store = createStore<ITransactionState>({
  ...initialState,
});

/*
  All components using `state` must be included in
  `excludeComponents` under `stencil.config.ts`
*/
const state = store.state;

export const resetState = () => ({
  ...state,
  ...initialState,
});

export default state;
