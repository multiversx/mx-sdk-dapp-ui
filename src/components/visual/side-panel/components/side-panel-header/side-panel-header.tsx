import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';

export enum SidePanelHeaderSlotEnum {
  leftIcon = 'left-icon',
  rightIcon = 'right-icon',
}

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

  @Event({ composed: false, bubbles: false }) rightButtonClick: EventEmitter;
  @Event({ composed: false, bubbles: false }) leftButtonClick: EventEmitter;

  handleRightIconClick(event: MouseEvent) {
    event.preventDefault();
    this.rightButtonClick.emit();
  }

  handleLeftIconClick(event: MouseEvent) {
    event.preventDefault();
    this.leftButtonClick.emit();
  }

  render() {
    return (
      <div class="side-panel-heading">
        <div
          class={{ 'side-panel-heading-left': true, 'visible': this.hasLeftButton }}
          onClick={this.handleLeftIconClick.bind(this)}
        >
          <slot name={SidePanelHeaderSlotEnum.leftIcon}>
            <mvx-back-arrow-icon />
          </slot>
        </div>

        <div class="side-panel-heading-title">{this.panelTitle}</div>

        <div
          class={{ 'side-panel-heading-right': true, 'visible': this.hasRightButton }}
          onClick={this.handleRightIconClick.bind(this)}
        >
          <slot name={SidePanelHeaderSlotEnum.rightIcon}>
            <mvx-close-icon />
          </slot>
        </div>
      </div>
    );
  }
}
