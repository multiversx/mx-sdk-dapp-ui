import { createStore } from '@stencil/store';
import type { ISignTransactionsPanelData } from 'components/functional/sign-transactions-panel/sign-transactions-panel.types';

interface State extends ISignTransactionsPanelData {
  isLoading: boolean;
  isWaitingForSignature: boolean;
  onSign: () => void;
  onCancel: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const initialState: State = {
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

const { state } = createStore<State>({
  ...initialState,
});

export const resetState = () => ({
  ...state,
  ...initialState,
});

export default state;
