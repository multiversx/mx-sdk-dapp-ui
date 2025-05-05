import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'mvx-data-row',
  styleUrl: 'data-row.css',
})
export class DataRow {
  @Prop() data?: string;
  @Prop() highlight?: string;

  @State() isExpanded = false;

  toggleExpanded = () => {
    this.isExpanded = !this.isExpanded;
  };

  getHighlightedData() {
    if (!this.data) {
      return '—';
    }
    if (!this.highlight) {
      return this.data;
    }

    const parts = this.data.split(this.highlight);

    return (
      <span>
        {parts.map((part, index) => (
          <span>
            <span class="data-content">{part}</span>
            {index < parts.length - 1 && <span class="highlight">{this.highlight}</span>}
          </span>
        ))}
      </span>
    );
  }

  render() {
    const dataValue = this.getHighlightedData();

    return (
      <div>
        <div class="info-row">
          <div class="info-label">Data</div>
          <div class="info-value">
            {dataValue}
            <span class={`expand-icon ${this.isExpanded ? 'expanded' : ''}`} onClick={this.toggleExpanded}>
              ›
            </span>
          </div>
        </div>
        {this.isExpanded && (
          <div class="expanded-data">
            <pre>{this.data}</pre>
          </div>
        )}
      </div>
    );
  }
}
