import { Component, Event, h, Prop } from '@stencil/core';

import type { IGenericModalProps } from './generic-modal.types';

@Component({
  tag: 'generic-modal',
  styleUrl: './generic-modal.css',
  shadow: false,
})
export class GenericModal {
  @Prop() body: IGenericModalProps['body'];
  @Prop() modalTitle: IGenericModalProps['modalTitle'];
  @Prop() modalSubtitle?: IGenericModalProps['modalSubtitle'];
  @Event() close: IGenericModalProps['close'];

  render() {
    return (
      <div class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <span class="close" onClick={() => this.close.emit()}>
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
