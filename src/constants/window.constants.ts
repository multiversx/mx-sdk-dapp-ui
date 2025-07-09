import type { ExtendedWindow, SafeWindowType } from '../types/window.types';

export const safeWindow = typeof window !== 'undefined' ? (window as ExtendedWindow) : ({} as SafeWindowType);
