import { Component, Prop, VNode, h } from '@stencil/core';

@Component({
  tag: 'generic-modal',
  styleUrl: './generic-modal.css',
  shadow: false,
})
export class GenericModal {
  @Prop() body: VNode;
  @Prop() modalTitle: string | VNode;
  @Prop() modalSubtitle?: string | VNode;
  @Prop() onClose: () => void;

  render() {
    return (
      <div class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <span class="close" onClick={this.onClose}>
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
