import { Component, Prop, VNode, h, Event } from '@stencil/core';

@Component({
  tag: 'generic-modal',
  styleUrl: './generic-modal.css',
  shadow: true,
})
export class GenericModal {
  @Prop() body: VNode;
  @Prop() modalTitle: string | VNode;
  @Prop() modalSubtitle?: string | VNode;
  @Event() close: () => void;

  render() {
    return (
      <div class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <span class="close" onClick={this.close}>
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
