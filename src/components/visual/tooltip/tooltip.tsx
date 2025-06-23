import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'mvx-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true,
})
export class Tooltip {
  @Event() triggerRender: EventEmitter<boolean>;
  @State() isTooltipVisible: boolean = false;

  @Prop() position: 'top' | 'bottom' = 'top';
  @Prop() triggerOnClick?: boolean = false;
  @Prop() trigger: HTMLElement;
  @Prop() class?: string;

  constructor() {
    this.handleEllipsisClick = this.handleEllipsisClick.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
  }

  private setTooltipVisible(isTooltipVisible: boolean) {
    this.isTooltipVisible = isTooltipVisible;
    this.triggerRender.emit(this.isTooltipVisible);
  }

  private handleEllipsisClick(event: MouseEvent) {
    if (!this.triggerOnClick) {
      return;
    }

    event.preventDefault();
    this.setTooltipVisible(!this.isTooltipVisible);
  }

  private handleFocusOut(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as Node;
    const currentTarget = event.currentTarget as HTMLElement;

    if (!currentTarget.contains(relatedTarget)) {
      this.setTooltipVisible(false);
    }
  }

  private handleMouseEvent(isTooltipVisible: boolean) {
    if (this.triggerOnClick) {
      return;
    }

    return (event: MouseEvent) => {
      event.preventDefault();
      this.setTooltipVisible(isTooltipVisible);
    };
  }

  render() {
    return (
      <div
        onClick={this.handleEllipsisClick}
        onMouseEnter={this.handleMouseEvent(true)}
        onMouseLeave={this.handleMouseEvent(false)}
        class={{ tooltip: true, [this.class]: Boolean(this.class) }}
      >
        {this.isTooltipVisible && (
          <div class={{ 'tooltip-content-wrapper': true, [this.position]: true }}>
            <div
              class={{ 'tooltip-content': true, [this.position]: true }}
              tabIndex={-1}
              onFocusout={this.handleFocusOut}
              onClick={(event: MouseEvent) => event.stopPropagation()}
            >
              <slot />
            </div>
          </div>
        )}

        <span class="tooltip-trigger">{this.trigger}</span>
      </div>
    );
  }
}
