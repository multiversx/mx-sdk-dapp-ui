import { Component, Event, h, Prop } from '@stencil/core';

import type { IGenericModalProps } from './generic-modal.types';

@Component({
  tag: 'mvx-generic-modal',
  styleUrl: './generic-modal.css',
})
export class GenericModal {
  @Prop() body: IGenericModalProps['body'];
  @Prop() modalTitle: IGenericModalProps['modalTitle'];
  @Prop() modalSubtitle?: IGenericModalProps['modalSubtitle'];
  @Event() close: IGenericModalProps['close'];

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
