import type { EventEmitter } from '@stencil/core';
import { Component, Event, h } from '@stencil/core';

@Component({
  tag: 'mvx-ledger-intro',
  shadow: true,
})
export class LedgerIntro {
  @Event() connect: EventEmitter;

  render() {
    return (
      <div>
        <h1>Ledger Intro</h1>
        <button onClick={this.connect.emit}>Connect</button>
      </div>
    );
  }
}
