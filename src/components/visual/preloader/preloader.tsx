import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-preloader',
  styleUrl: 'preloader.scss',
  shadow: true,
})
export class Preloader {
  @Prop() class?: string;

  render() {
    return (
      <div class={{ preloader: true, [this.class]: Boolean(this.class) }}>
        <slot />
      </div>
    );
  }
}
