// import { faX } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State, Watch } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'side-panel',
  styleUrl: 'side-panel.scss',
  shadow: true,
})
export class SidePanel {
  @Prop() isOpen: boolean = false;
  @Prop() panelClassName?: string;
  @Prop() title: string;

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
          <div class="side-panel-heading">
            <div class="side-panel-heading-title">{this.title}</div>
            <div class="side-panel-heading-close"></div>
          </div>

          <div class="side-panel-content">
            <slot></slot>
          </div>
        </div>
      </div>
    );
  }
}
