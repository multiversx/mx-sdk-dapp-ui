import { safeWindow } from 'constants/window.constants';

export const isFirefox = () => safeWindow?.navigator?.userAgent.match('Firefox');
