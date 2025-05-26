import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State, Watch } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'mvx-side-panel',
  styleUrl: 'side-panel.scss',
  shadow: true,
})
export class SidePanel {
  @Prop() isOpen: boolean = false;
  @Prop() panelClassName?: string;
  @Prop() panelTitle: string;
  @Prop() hasBackButton?: boolean;
  @Prop() showHeader?: boolean = true;

  @Event() close: EventEmitter<void>;
  @Event() back: EventEmitter<void>;

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
    this.isVisible = false;
    this.shouldAnimate = false;
    this.closeTimeout = null;
  }

  private readonly handleOverlayClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  };

  private readonly handleCloseClick = (event: CustomEvent) => {
    event.preventDefault();

    this.close.emit();
  };

  private readonly handleBackClick = (event: CustomEvent) => {
    event.preventDefault();

    this.back.emit();
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
          {this.showHeader && (
            <mvx-side-panel-header
              panelTitle={this.panelTitle}
              panelClassName={this.panelClassName}
              hasLeftButton={this.hasBackButton}
              onRightButtonClick={this.handleCloseClick}
              onLeftButtonClick={this.handleBackClick}
            />
          )}

          <div class="side-panel-content">
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
