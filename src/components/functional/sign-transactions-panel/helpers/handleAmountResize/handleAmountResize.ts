export const handleAmountResize = (element: HTMLElement | null) => {
  if (!element) {
    return;
  }

  const getElementWidth = (element: HTMLElement) => element.getBoundingClientRect().width;
  const getFontSize = (element: HTMLElement) => parseInt(getComputedStyle(element).getPropertyValue('font-size'));

  const firstChild = element.firstChild as HTMLElement;
  const maxWidth = 270;
  const sizes = {
    parent: Math.min(element.offsetWidth, maxWidth),
    firstChild: getFontSize(firstChild),
  };

  if (!firstChild) {
    return;
  }

  while (sizes.parent < getElementWidth(firstChild)) {
    const updatedSize = sizes.firstChild - 0.1;
    const updatedSizesObject = { firstChild: updatedSize };
    const updatedFontSize = { fontSize: `${updatedSize}px` };

    Object.assign(firstChild.style, updatedFontSize);
    Object.assign(sizes, updatedSizesObject);
  }
};
