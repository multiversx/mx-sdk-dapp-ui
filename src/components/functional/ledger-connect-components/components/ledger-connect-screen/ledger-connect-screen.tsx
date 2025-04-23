import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IConnectScreenData } from '../../../ledger/ledger-flow/ledger-flow.types';

@Component({
  tag: 'mvx-ledger-connect-screen',
  styleUrl: 'ledger-connect-screen.scss',
})
export class LedgerConnectScreen {
  @Prop() connectScreenData: IConnectScreenData;
  @Event() connect: EventEmitter;

  render() {
    return (
      <div>
        {this.connectScreenData?.error && <p>{this.connectScreenData.error}</p>}
        {this.connectScreenData?.customContentMarkup && this.connectScreenData?.customContentMarkup}

        <button data-testid={DataTestIdsEnum.ledgerConnectBtn} class="access-button" onClick={() => this.connect.emit()} disabled={this.connectScreenData?.disabled}>
          Connect Ledger
        </button>
        <a
          href="https://support.ledger.com/hc/en-us/articles/115005165269-Connection-issues-with-Windows-or-Linux"
          target="_blank"
          rel="noopener noreferrer"
          class="connection-link"
        >
          Having connection issues?
        </a>
      </div>
    );
  }
}
