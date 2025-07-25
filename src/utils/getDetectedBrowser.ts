import { BrowserEnum } from 'constants/browser.enum';
import { safeWindow } from 'constants/window.constants';

export const getDetectedBrowser = () => {
  const nav = safeWindow?.navigator;
  const userAgent = nav?.userAgent || '';

  if (/Edg/.test(userAgent)) {
    return BrowserEnum.Edge;
  }

  if (/Firefox/.test(userAgent)) {
    return BrowserEnum.Firefox;
  }

  if (nav && typeof (nav as any).brave !== 'undefined') {
    return BrowserEnum.Brave;
  }
  if (userAgent.toLowerCase().includes('brave')) {
    return BrowserEnum.Brave;
  }

  const el = document.createElement('div');
  document.body.appendChild(el);
  const computedStyle = getComputedStyle(el);
  const hasArcPalette = computedStyle.getPropertyValue('--arc-palette-background') !== '';
  document.body.removeChild(el);
  if (hasArcPalette) {
    return BrowserEnum.Arc;
  }

  if (/Chrome/.test(userAgent)) {
    return BrowserEnum.Chrome;
  }
};
