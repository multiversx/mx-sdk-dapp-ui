import { Component, getAssetPath, h, Host } from '@stencil/core';

@Component({
  tag: 'styled-host',
  shadow: true,
  assetsDirs: ['assets'],
})
export class StyledHost {
  render() {
    return (
      <Host>
        <link rel="stylesheet" href={getAssetPath('tailwind.css')} />
        <slot />
      </Host>
    );
  }
}
