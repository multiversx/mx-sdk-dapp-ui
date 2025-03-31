import { Component, Event, h, Prop } from '@stencil/core';

import type { IMvxGenericModalProps } from './mvx-generic-modal.types';

@Component({
  tag: 'mvx-generic-modal',
  styleUrl: './mvx-generic-modal.css',
})
export class MvxGenericModal {
  @Prop() body: IMvxGenericModalProps['body'];
  @Prop() modalTitle: IMvxGenericModalProps['modalTitle'];
  @Prop() modalSubtitle?: IMvxGenericModalProps['modalSubtitle'];
  @Event() close: IMvxGenericModalProps['close'];

  private handleClose() {
    this.close.emit();
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.handleClose();
    }
  }

  render() {
    return (
      <div class="modal" onKeyDown={this.handleKeyDown.bind(this)}>
        <div class="modal-content">
          <div class="modal-header">
            <span class="close" onClick={this.handleClose.bind(this)}>
              ✕
            </span>
            <h2>{this.modalTitle}</h2>
            {this.modalSubtitle && <h4>{this.modalSubtitle}</h4>}
          </div>
          {this.body}
        </div>
      </div>
    );
  }
}
