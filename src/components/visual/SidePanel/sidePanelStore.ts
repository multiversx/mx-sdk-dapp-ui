import { createStore } from '@stencil/store';

interface ISidePanelState {
    isVisible: boolean;
    currentSnapIndex: number;
    shouldAnimate: boolean;
}

const initialState: ISidePanelState = {
    isVisible: false,
    currentSnapIndex: 1,
    shouldAnimate: false
}

const store = createStore<ISidePanelState>({
    ...initialState,
});

const state = store.state;

export const resetState = () => {
    Object.assign(state, initialState);
};

export default state;