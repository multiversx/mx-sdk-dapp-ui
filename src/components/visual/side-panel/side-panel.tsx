import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Host, Prop, State, Watch } from '@stencil/core';

import type { ISidePanelProps } from './side-panel.types';

@Component({
  tag: 'side-panel',
  styleUrl: 'side-panel.scss',
  shadow: true,
})
export class SidePanel implements ISidePanelProps {
  @Prop() isOpen: boolean = false;
  @Prop() side!: ISidePanelProps['side'];
  @Prop() panelClassName?: string;

  @Event() close: EventEmitter;

  @State() isVisible: boolean = false;
  @State() shouldAnimate: boolean = false;

  private closeTimeout: NodeJS.Timeout | null = null;
  private readonly ANIMATION_DURATION_MS = 300;

  @Watch('isOpen')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
      }

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
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }

  handleOverlayClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  };

  render() {
    if (!this.isVisible) {
      return null;
    }

    return (
      <Host>
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
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
