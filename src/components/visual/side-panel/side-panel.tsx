import type { EventEmitter } from '@stencil/core';
import { Component, Element, Event, h, Prop, State, Watch } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'mvx-side-panel',
  styleUrl: 'side-panel.scss',
})
export class SidePanel {
  @Element() host: HTMLElement;

  @Prop() isOpen: boolean = false;
  @Prop() panelClassName?: string;
  @Prop() panelTitle: string;
  @Prop() withBackButton?: boolean;

  @Event() close: EventEmitter;
  @Event() back: EventEmitter;

  @State() isVisible: boolean = false;
  @State() shouldAnimate: boolean = false;
  @State() childElements: Element[] = [];

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

  handleOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  handleCloseClick(event: MouseEvent) {
    event.preventDefault();
    this.close.emit();
  }

  handleBackClick(event: MouseEvent) {
    event.preventDefault();
    this.back.emit();
  }

  componentWillLoad() {
    this.childElements = [...this.host.children];
    this.host.innerHTML = '';
  }

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
            {this.withBackButton && <mvx-back-arrow-icon onClick={this.handleBackClick.bind(this)} class="side-panel-heading-back" />}
            <div class="side-panel-heading-title">{this.panelTitle}</div>
            <mvx-close-icon class="side-panel-heading-close" onClick={this.handleCloseClick.bind(this)} />
          </div>

          <div class="side-panel-content">
            <mvx-children>
              {this.childElements.map((childElement, childElementIndex) => (
                <div key={childElementIndex} ref={element => element.replaceWith(childElement)} />
              ))}
            </mvx-children>
          </div>
        </div>
      </div>
    );
  }
}
