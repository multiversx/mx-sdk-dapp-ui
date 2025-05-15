import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';

import { SidePanelHeaderSlotEnum } from './side-panel-header.types';

@Component({
  tag: 'mvx-side-panel-header',
  styleUrl: 'side-panel-header.scss',
  shadow: true,
})
export class SidePanelHeader {
  @Prop() panelClassName?: string;
  @Prop() panelTitle: string;
  @Prop() hasLeftButton?: boolean = true;
  @Prop() hasRightButton?: boolean = true;

  @Event({ composed: false, bubbles: false }) rightIconClick: EventEmitter;
  @Event({ composed: false, bubbles: false }) leftIconClick: EventEmitter;

  handleRightIconClick(event: MouseEvent) {
    event.preventDefault();
    this.rightIconClick.emit();
  }

  handleLeftIconClick(event: MouseEvent) {
    event.preventDefault();
    this.leftIconClick.emit();
  }

  render() {
    return (
      <div class="side-panel-heading">
        {this.hasLeftButton && (
          <div class={{ 'side-panel-heading-left': true, 'no-margin': !this.hasRightButton }} onClick={this.handleLeftIconClick.bind(this)}>
            <slot name={SidePanelHeaderSlotEnum.leftIcon}>
              <mvx-back-arrow-icon />
            </slot>
          </div>
        )}

        <div class={{ 'side-panel-heading-title': true, 'center': this.hasLeftButton && !this.hasRightButton }}>{this.panelTitle}</div>

        {this.hasRightButton && (
          <div class="side-panel-heading-right" onClick={this.handleRightIconClick.bind(this)}>
            <slot name={SidePanelHeaderSlotEnum.rightIcon}>
              <mvx-close-icon />
            </slot>
          </div>
        )}
      </div>
    );
  }
}
