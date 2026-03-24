import { Component, h, Prop, State } from '@stencil/core';
import { CopyButton } from 'common/CopyButton/CopyButton';
import { ExplorerLink } from 'common/ExplorerLink/ExplorerLink';
import { Tooltip } from 'common/Tooltip/Tooltip';
import { Trim } from 'common/Trim/Trim';

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
  @Prop({ attribute: 'data-testid' }) dataTestId?: string;
  @Prop() class?: string;
  @Prop() data: string;

  @State() isCopyTooltipVisible: boolean = false;
  @State() isExplorerTooltipVisible: boolean = false;

  render() {
    return (
      <div
        class={{ 'data-with-explorer-link': true, [this.class]: Boolean(this.class) }}
        data-testid={this.dataTestId}
      >
        <Trim text={this.data} class="data-with-explorer-link-trim" />

        {(this.showCopyButton || this.showExplorerButton) && (
          <div class="data-with-explorer-link-buttons" onClick={event => event.stopPropagation()}>
            {this.showCopyButton && this.withTooltip && (
              <Tooltip
                position="bottom"
                trigger={<CopyButton text={this.data} />}
                isTooltipVisible={this.isCopyTooltipVisible}
                onVisibilityChange={isVisible => { this.isCopyTooltipVisible = isVisible; }}
              >
                Copy
              </Tooltip>
            )}

            {this.showExplorerButton && this.withTooltip && (
              <Tooltip
                position="bottom"
                trigger={<ExplorerLink link={this.explorerLink} />}
                isTooltipVisible={this.isExplorerTooltipVisible}
                onVisibilityChange={isVisible => { this.isExplorerTooltipVisible = isVisible; }}
              >
                Explore
              </Tooltip>
            )}

            {this.showCopyButton && !this.withTooltip && <CopyButton text={this.data} />}
            {this.showExplorerButton && !this.withTooltip && <ExplorerLink link={this.explorerLink} />}
          </div>
        )}
      </div>
    );
  }
}
