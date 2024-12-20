import { createStore } from '@stencil/store';
import { ISignTransactionsModalData } from 'components';

type ITransactionState = ISignTransactionsModalData & {
  onSign: () => void;
};

const initialState: ITransactionState = {
  data: '',
  total: 0,
  tokenType: null,
  identifier: '',
  tokenAmount: '',
  tokenImageUrl: '',
  egldLabel: '',
  usdValue: '',
  feeLimit: '',
  feeInFiatLimit: '',
  currentIndex: 0,
  receiver: '',
  onSign: null,
};

const { state } = createStore<ITransactionState>({
  ...initialState,
});

export const resetState = () => {
  Object.assign(state, initialState);
};

export default state;
