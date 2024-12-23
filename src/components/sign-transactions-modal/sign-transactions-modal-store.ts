import { createStore } from '@stencil/store';
import { ISignTransactionsModalData } from 'components/sign-transactions-modal/sign-transactions-modal.types';

type ITransactionState = ISignTransactionsModalData & {
  isLoading: boolean;
  onSign: () => void;
};

const initialState: ITransactionState = {
  isLoading: true,
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

export const resetState = () => {
  Object.assign(state, initialState);
};

export default state;
