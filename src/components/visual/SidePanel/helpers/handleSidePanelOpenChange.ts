export function handleSidePanelOpenChange(
    isOpen: boolean,
    setShouldAnimate: (value: boolean) => void
) {
    if (isOpen) {
        requestAnimationFrame(() => setShouldAnimate(true));
    } else {
        setShouldAnimate(false);
    }
}