import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State, Watch } from '@stencil/core';

import { SidePanelSideEnum } from './side-panel.types';

@Component({
  tag: 'mvx-side-panel',
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
      <styled-host>
        <div
          class={{
            'overlay': true,
            'visible': this.shouldAnimate,
            'hidden': !this.shouldAnimate,
            'side-left': this.side === 'left',
            'side-right': this.side === 'right',
          }}
          onClick={this.handleOverlayClick}
        >
          <div
            class={{
              panel: true,
              [this.panelClassName]: Boolean(this.panelClassName),
            }}
          >
            <div class="panel-content">
              <slot></slot>
            </div>
          </div>
        </div>
      </styled-host>
    );
  }
}
