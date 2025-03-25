import { h, Host } from '@stencil/core';

export const StyledHost = (attrs: any, children: any) => {
  const stylePath = new URL('../sdk-dapp-core-ui/sdk-dapp-core-ui.css', import.meta.url).href;
  return (
    <Host {...attrs}>
      <link rel="stylesheet" href={stylePath} />
      {children}
    </Host>
  );
};
