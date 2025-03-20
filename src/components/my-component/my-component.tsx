import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  shadow: false,
})
export class MyComponent {
  render() {
    return <div class="p-4 bg-blue-500 text-white">Hello, Tailwind CSS!</div>;
  }
}
