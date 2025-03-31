import { Component, Element, h } from '@stencil/core';

@Component({
  tag: 'mvx-generic-spinner',
  styleUrl: './mvx-generic-spinner.css',
})
export class MvxGenericSpinner {
  @Element() host: HTMLElement;

  render() {
    return <div class="spinner" {...this.host.attributes}></div>;
  }
}
