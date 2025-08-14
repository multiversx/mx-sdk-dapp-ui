import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-data-with-explorer-link',
  styleUrl: 'data-with-explorer-link.scss',
  shadow: true,
})
export class DataWithExplorerLink {
  @Prop() showExplorerButton?: boolean = true;
  @Prop() showCopyButton?: boolean = true;
  @Prop() explorerLink: string;
  @Prop() dataTestId?: string;
  @Prop() class?: string;
  @Prop() data: string;

  render() {
    return (
      <div class={{ 'data-with-explorer-link': true, [this.class]: Boolean(this.class) }} data-testid={this.dataTestId}>
        <span class="data-with-explorer-link-trim-wrapper">
          <mvx-trim text={this.data} class="data-with-explorer-link-trim" />
        </span>

        {(this.showCopyButton || this.showExplorerButton) && (
          <div class="data-with-explorer-link-buttons" onClick={event => event.stopPropagation()}>
            {this.showCopyButton && <mvx-copy-button text={this.data} />}
            {this.showExplorerButton && <mvx-explorer-link class="mvx:text-primary" link={this.explorerLink} />}
          </div>
        )}
      </div>
    );
  }
}
