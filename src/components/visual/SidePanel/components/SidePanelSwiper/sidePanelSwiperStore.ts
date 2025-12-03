import { createStore } from '@stencil/store';

interface ISidePanelSwiperState {
    isVisible: boolean;
    currentSnapIndex: number;
}

const initialState: ISidePanelSwiperState = {
    isVisible: false,
    currentSnapIndex: 1
}

const store = createStore<ISidePanelSwiperState>({
    ...initialState,
});

const state = store.state;

export const resetState = () => {
    Object.assign(state, initialState);
};

export default state;