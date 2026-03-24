import { h } from '@stencil/core';

interface PreloaderPropsType {
  class?: string;
}

export function Preloader({ class: className }: PreloaderPropsType = {}, children?: any) {
  return (
    <div class={{ preloader: true, [className]: Boolean(className) }}>
      {children}
    </div>
  );
}
