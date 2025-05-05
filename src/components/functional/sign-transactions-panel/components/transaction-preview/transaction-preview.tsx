import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-transaction-preview',
  styleUrl: 'transaction-preview.css',
})
export class TransactionPreview {
  @Prop() imageURL?: string;
  @Prop() previewSubtitle?: string;
  @Prop() previewTitle?: string;
  @Prop() previewAdditionalInfo?: string;

  render() {
    return (
      <div class="transaction-preview-container">
        {this.previewTitle && <h2>{this.previewTitle}</h2>}

        <div class="transaction-preview-content">
          {this.imageURL && (
            <div class="transaction-preview-image">
              <img src={this.imageURL} alt={this.previewSubtitle} />
            </div>
          )}

          <div class="transaction-preview-text">
            <div class="subtitle-container">
              <span class="subtitle">{this.previewSubtitle}</span>
            </div>

            {this.previewAdditionalInfo && (
              <div class="additional-info-container">
                <span class="additional-info">{this.previewAdditionalInfo}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
