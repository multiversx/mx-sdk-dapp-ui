import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { Tooltip as TooltipComponent } from 'common/Tooltip/Tooltip';

@Component({
  tag: 'mvx-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true,
})
export class Tooltip {
  @Prop() position: 'top' | 'bottom' = 'top';
  @Prop() triggerOnClick?: boolean = false;
  @Prop() trigger: HTMLElement;
  @Prop() class?: string;

  @Event() triggerRender: EventEmitter<boolean>;
  @State() private isVisible: boolean = false;

  private handleVisibilityChange = (isVisible: boolean) => {
    this.triggerRender.emit(isVisible);
    this.isVisible = isVisible;
  };


  render() {
    return (
      <TooltipComponent
        position={this.position}
        triggerOnClick={this.triggerOnClick}
        trigger={this.trigger}
        class={this.class}
        isTooltipVisible={this.isVisible}
        onVisibilityChange={this.handleVisibilityChange}
      >
        <slot />
      </TooltipComponent>
    );
  }
}
