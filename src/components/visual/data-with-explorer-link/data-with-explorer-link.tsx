import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-data-with-explorer-link',
  styleUrl: 'data-with-explorer-link.scss',
  shadow: false,
})
export class DataWithExplorerLink {
  @Prop() showExplorerButton?: boolean = true;
  @Prop() showCopyButton?: boolean = true;
  @Prop() withTooltip?: boolean = false;
  @Prop() explorerLink: string;
  @Prop() dataTestId?: string;
  @Prop() class?: string;
  @Prop() data: string;

  render() {
    return (
      <div class={{ 'data-with-explorer-link': true, [this.class]: Boolean(this.class) }} data-testid={this.dataTestId}>
        <mvx-trim text={this.data} class="data-with-explorer-link-trim" />

        {(this.showCopyButton || this.showExplorerButton) && (
          <div class="data-with-explorer-link-buttons" onClick={event => event.stopPropagation()}>
            {this.showCopyButton && this.withTooltip && (
              <mvx-tooltip position="bottom" trigger={<mvx-copy-button text={this.data} />}>
                Copy
              </mvx-tooltip>
            )}

            {this.showExplorerButton && this.withTooltip && (
              <mvx-tooltip position="bottom" trigger={<mvx-explorer-link link={this.explorerLink} />}>
                Explore
              </mvx-tooltip>
            )}

            {this.showCopyButton && !this.withTooltip && <mvx-copy-button text={this.data} />}
            {this.showExplorerButton && !this.withTooltip && <mvx-explorer-link link={this.explorerLink} />}
          </div>
        )}
      </div>
    );
  }
}
