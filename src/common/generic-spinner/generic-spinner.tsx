import { Component, Element,h } from '@stencil/core';

@Component({
  tag: 'generic-spinner',
  styleUrl: './generic-spinner.css',
  shadow: false,
})
export class GenericSpinner {
  @Element() host: HTMLElement;

  render() {
    return <div class="spinner" {...this.host.attributes}></div>;
  }
}
