import type { VNode } from '@stencil/core';
import { h } from '@stencil/core';
import classNames from 'classnames';

// prettier-ignore
const styles = {
  preloader: 'preloader mvx:w-30 mvx:h-30 mvx:relative mvx:transition-all mvx:duration-200 mvx:overflow-hidden mvx:rounded-lg mvx:ease-in-out',
} satisfies Record<string, string>;

export interface PreloaderPropsType {
  class?: string;
  children?: VNode | VNode[];
}

export function Preloader({ class: className, children }: PreloaderPropsType) {
  return (
    <div
      class={classNames(styles.preloader, className)}
      style={{
        animation: 'PreloaderPulseAnimation 2s infinite',
        background: 'var(--mvx-preloader-bg)',
      }}
    >
      {children}
    </div>
  );
}
