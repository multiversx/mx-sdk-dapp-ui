import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import classNames from 'classnames';

import type { IConnectScreenData } from '../../ledger-connect.types';

const ledgerIntroClasses: Record<string, string> = {
  icon: 'mvx:w-50 mvx:h-auto mvx:xs:w-100 mvx:xs:h-85',
};

@Component({
  tag: 'mvx-ledger-intro',
  styleUrl: 'ledger-intro.scss',
  shadow: true,
})
export class LedgerIntro {
  @Event() connect?: EventEmitter;

  @Prop() connectScreenData?: IConnectScreenData;
  @Prop() isAwaiting?: boolean = false;

  handleLedgerConnectClick(event: MouseEvent) {
    event.preventDefault();

    if (this.connect) {
      this.connect.emit(event);
    }
  }

  render() {
    const showError = this.connectScreenData && this.connectScreenData.error;

    const buttonLabel = (() => {
      if (this.isAwaiting) {
        return 'Connecting...';
      }

      if (showError) {
        return 'Retry Connection';
      }

      return 'Connect Ledger';
    })();

    return (
      <div class="ledger-intro">
        <div class="ledger-intro-wrapper">
          <mvx-ledger-icon
            class={classNames('ledger-intro-icon', {
              [ledgerIntroClasses.icon]: true,
            })}
          />

          <div class="ledger-intro-description">
            Connect your device <br />
            and open the MultiversX App
          </div>

          <button
            class={{ 'ledger-intro-button': true, 'loading': Boolean(this.isAwaiting) }}
            onClick={this.handleLedgerConnectClick.bind(this)}
          >
            <span class="ledger-intro-button-label">{buttonLabel}</span>
            {this.isAwaiting && <mvx-spinner-icon />}
          </button>

          {showError && <div class="ledger-intro-error">{this.connectScreenData.error}</div>}
        </div>

        <a
          href="https://support.ledger.com/hc/en-us/articles/115005165269-Connection-issues-with-Windows-or-Linux"
          target="_blank"
          rel="noopener noreferrer"
          class="ledger-intro-issues"
        >
          Having connection issues?
        </a>
      </div>
    );
  }
}
