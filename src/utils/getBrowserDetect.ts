import { safeWindow } from 'constants/window.constants';

export const getBrowserDetect = () => {
  const isChrome = () => /Chrome/.test(safeWindow?.navigator?.userAgent || '');
  const isFirefox = () => /Firefox/.test(safeWindow?.navigator?.userAgent || '');
  const isEdge = () => /Edg/.test(safeWindow?.navigator?.userAgent || '');

  // const isBrave = () => (safeWindow as any).navigator?.brave?.isBrave?.() === true;
  const isBrave = () => {
    const nav = safeWindow?.navigator;
    const userAgent = nav && nav.userAgent;

    if (nav && typeof (nav as any).brave !== 'undefined') {
      return true; // Brave exposes the `navigator.brave` object
    }

    return userAgent && userAgent.toLowerCase().includes('brave');
  };

  return { isChrome, isFirefox, isEdge, isBrave };
};
