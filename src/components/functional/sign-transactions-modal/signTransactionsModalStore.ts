import { createStore } from '@stencil/store';
import type { ISignTransactionsModalData } from 'components/functional/sign-transactions-modal/sign-transactions-modal.types';

type ITransactionState = ISignTransactionsModalData & {
  isLoading: boolean;
  isWaitingForSignature: boolean;
  onSign: () => void;
  onCancel: () => void;
  onPrev: () => void;
  onNext: () => void;
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
    currentTransactionIndex: 0,
    receiver: '',
    nextUnsignedTxIndex: 0,
  },
  nftTransaction: null,
  sftTransaction: null,
  tokenTransaction: null,
  onSign: null,
  onCancel: null,
  onPrev: null,
  onNext: null,
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
