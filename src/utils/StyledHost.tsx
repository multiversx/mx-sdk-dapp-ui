import { h, Host } from '@stencil/core';

export const StyledHost = (attrs: any, children: any) => {
  const tailwindPath = new URL('../../www/assets/tailwind.css', import.meta.url).href;
  return (
    <Host {...attrs}>
      <link rel="stylesheet" href={tailwindPath} />
      {children}
    </Host>
  );
};
