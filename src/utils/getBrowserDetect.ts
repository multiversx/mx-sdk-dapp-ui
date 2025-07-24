import { safeWindow } from 'constants/window.constants';

export const getBrowserDetect = () => {
  const isChrome = () => /Chrome/.test(safeWindow?.navigator?.userAgent || '');

  const isFirefox = () => /Firefox/.test(safeWindow?.navigator?.userAgent || '');

  const isEdge = () => /Edg/.test(safeWindow?.navigator?.userAgent || '');

  const isBrave = () => {
    const nav = safeWindow?.navigator;
    const userAgent = nav && nav.userAgent;

    if (nav && typeof (nav as any).brave !== 'undefined') {
      return true;
    }

    return userAgent && userAgent.toLowerCase().includes('brave');
  };

  const isArc = () => {
    const el = document.createElement('div');
    document.body.appendChild(el);

    const computedStyle = getComputedStyle(el);
    const hasArcPalette = computedStyle.getPropertyValue('--arc-palette-background') !== '';

    document.body.removeChild(el);

    return hasArcPalette;
  };

  return { isChrome, isFirefox, isEdge, isBrave, isArc };
};
