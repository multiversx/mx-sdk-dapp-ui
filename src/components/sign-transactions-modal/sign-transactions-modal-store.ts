import { createStore } from '@stencil/store';
import { ISignTransactionsModalData } from 'components';

type ITransactionState = ISignTransactionsModalData & {
  onSign: () => void;
};

const initialState: ITransactionState = {
  egldLabel: '',
  feeLimit: '',
  feeInFiatLimit: '',
  total: 0,
  currentIndex: 0,
  onSign: null,
};

const { state } = createStore<ITransactionState>({
  ...initialState,
});

export const resetState = () => {
  Object.assign(state, initialState);
};

export default state;
