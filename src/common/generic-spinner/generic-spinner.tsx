import { Component, Element, h } from '@stencil/core';

@Component({
  tag: 'mvx-generic-spinner',
  styleUrl: './generic-spinner.css',
})
export class GenericSpinner {
  @Element() host: HTMLElement;

  render() {
    return <div class="spinner" {...this.host.attributes}></div>;
  }
}
