import { createStore } from '@stencil/store';
import type { ISignTransactionsModalData } from 'components/functional/sign-transactions-modal/sign-transactions-modal.types';

type ITransactionState = ISignTransactionsModalData & {
  isLoading: boolean;
  isWaitingForSignature: boolean;
  onSign: () => void;
  onCancel: () => void;
  onPrev: () => void;
  onNext: () => void;
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
    nextUnsignedTxIndex: 0,
  },
  nftTransaction: null,
  sftTransaction: null,
  tokenTransaction: null,
  onSign: null,
  onCancel: null,
  onPrev: null,
  onNext: null,
};

const { state } = createStore<ITransactionState>({
  ...initialState,
});

export const resetState = () => ({
  ...state,
  ...initialState,
});

export default state;
