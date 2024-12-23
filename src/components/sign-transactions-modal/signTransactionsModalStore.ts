import { createStore } from '@stencil/store';
import { ISignTransactionsModalData } from 'components/sign-transactions-modal/sign-transactions-modal.types';

type ITransactionState = ISignTransactionsModalData & {
  isLoading: boolean;
  isWaitingForSignature: boolean;
  onSign: () => void;
};

const initialState: ITransactionState = {
  isLoading: true,
  isWaitingForSignature: false,
  commonData: {
    data: '',
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
  onSign: null,
};

const { state } = createStore<ITransactionState>({
  ...initialState,
});

export const resetState = () => ({
  ...state,
  ...initialState,
});

export default state;
