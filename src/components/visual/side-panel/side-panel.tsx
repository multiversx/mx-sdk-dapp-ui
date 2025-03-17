import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State, Watch } from '@stencil/core';
import classNames from 'classnames';

import { SidePanelSideEnum } from './side-panel.types';

@Component({
  tag: 'side-panel',
  styleUrl: 'side-panel.scss',
  shadow: true,
})
export class SidePanel {
  @Prop() isOpen: boolean = false;
  @Prop() side: SidePanelSideEnum = SidePanelSideEnum.RIGHT;
  @Prop() panelClassName?: string;

  @Event() close: EventEmitter;

  @State() isVisible: boolean = false;
  @State() shouldAnimate: boolean = false;

  private closeTimeout: NodeJS.Timeout | null = null;
  private readonly ANIMATION_DURATION_MS = 300;

  @Watch('isOpen')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      clearTimeout(this.closeTimeout);
      this.isVisible = true;
      requestAnimationFrame(() => {
        this.shouldAnimate = true;
      });

      return;
    }

    this.shouldAnimate = false;
    this.closeTimeout = setTimeout(() => {
      this.isVisible = false;
    }, this.ANIMATION_DURATION_MS);
  }

  disconnectedCallback() {
    clearTimeout(this.closeTimeout);
  }

  handleOverlayClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  };

  handleCloseClick = () => {
    this.close.emit();
  };

  render() {
    if (!this.isVisible) {
      return null;
    }

    return (
      <div
        onClick={this.handleOverlayClick}
        class={classNames('side-panel-wrapper', {
          visible: this.shouldAnimate,
        })}
      >
        <div class={classNames('side-panel', { visible: this.shouldAnimate }, this.panelClassName)}>
          <div class="side-panel-title">{}</div>

          <div class="side-panel-content">
            <slot></slot>
          </div>
        </div>
      </div>
    );
  }
}
