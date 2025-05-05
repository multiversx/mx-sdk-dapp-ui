import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'mvx-sc-call-row',
  styleUrl: 'sc-call-row.css',
})
export class ScCallRow {
  @Prop() scCall?: string;

  @State() isExpanded = false;

  toggleExpanded = () => {
    this.isExpanded = !this.isExpanded;
  };

  render() {
    if (!this.scCall) {
      return null;
    }

    return (
      <div>
        <div class="info-row">
          <div class="info-label">Smart Contract Call</div>
          <div class="info-value">
            View details
            <span class={`expand-icon ${this.isExpanded ? 'expanded' : ''}`} onClick={this.toggleExpanded}>
              ›
            </span>
          </div>
        </div>
        {this.isExpanded && (
          <div class="sc-call-details">
            <pre>{this.scCall}</pre>
          </div>
        )}
      </div>
    );
  }
}
