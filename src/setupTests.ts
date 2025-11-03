Object.assign(global, {
    ResizeObserver: class ResizeObserver {
        observe() { }
        disconnect() { }
        unobserve() { }
    }
});
