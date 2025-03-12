import { createStore } from '@stencil/store';
import type { ISignTransactionsModalData } from 'components/functional/sign-transactions-modal/sign-transactions-modal.types';

type ITransactionState = ISignTransactionsModalData & {
  isLoading: boolean;
  isWaitingForSignature: boolean;
  onCancel: () => void;
  onBack: () => void;
  onConfirm: () => void;
  onSetGasPriceMultiplier: (gasPriceMultiplier: 1 | 2 | 3) => void;
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
  },
  nftTransaction: null,
  sftTransaction: null,
  tokenTransaction: null,
  onCancel: null,
  onBack: null,
  onConfirm: null,
  onSetGasPriceMultiplier: null,
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
