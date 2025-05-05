import { Component, h, Prop } from '@stencil/core';
import { formatAddress } from 'utils/utils';

@Component({
  tag: 'mvx-receiver-row',
  styleUrl: 'receiver-row.css',
})
export class ReceiverRow {
  @Prop() receiver?: string;

  render() {
    const receiverValue = this.receiver ? formatAddress(this.receiver, 12) : '—';

    return (
      <div class="info-row">
        <div class="info-label">Receiver</div>
        <div class="info-value">
          {receiverValue}
          <span class="copy-icon">📋</span>
        </div>
      </div>
    );
  }
}
