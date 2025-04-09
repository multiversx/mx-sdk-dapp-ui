import { Component, h } from '@stencil/core';

@Component({
  tag: 'mvx-children',
  shadow: true,
})
export class Children {
  render() {
    return <slot />;
  }
}
