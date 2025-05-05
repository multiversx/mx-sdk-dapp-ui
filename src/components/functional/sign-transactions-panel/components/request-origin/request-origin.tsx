import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-request-origin',
  styleUrl: 'request-origin.css',
})
export class RequestOrigin {
  @Prop() origin: string = '';

  render() {
    return (
      <div class="request-origin">
        <p>Request from</p> <span class="origin-domain">{this.origin}</span>
      </div>
    );
  }
}
