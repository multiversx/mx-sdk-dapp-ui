import { Component, Element, h, Prop, State } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { ELLIPSIS } from 'constants/htmlStrings';

@Component({
  tag: 'mvx-trim',
  styleUrl: 'trim.scss',
})
export class Trim {
  @Element() el: HTMLElement;

  @Prop() text: string;
  @Prop() class?: string;
  @Prop() dataTestId?: string;

  @State() overflow: boolean = false;

  private trimRef: HTMLSpanElement;
  private hiddenTextRef: HTMLSpanElement;
  private resizeObserver: ResizeObserver;

  componentDidLoad() {
    this.setupResizeObserver();
    // Initial check after DOM elements exist
    requestAnimationFrame(() => this.checkOverflow());
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.checkOverflow();
    });

    if (this.trimRef) {
      this.resizeObserver.observe(this.trimRef);
    }
  }

  private checkOverflow = () => {
    if (this.hiddenTextRef && this.trimRef) {
      const hiddenWidth = this.hiddenTextRef.offsetWidth;
      const containerWidth = this.trimRef.offsetWidth;
      // Batch state updates to minimize re-renders
      if (this.overflow !== hiddenWidth > containerWidth) {
        this.overflow = hiddenWidth > containerWidth;
      }
    }
  };

  render() {
    const trimmedText = this.getTrimmedText();

    return (
      <span
        ref={el => (this.trimRef = el)}
        class={classNames('trim', this.class, { overflow: this.overflow })}
        data-testid={this.dataTestId ?? DataTestIdsEnum.trim}
      >
        <span ref={el => (this.hiddenTextRef = el)} class="hidden-text-ref">
          {this.text}
        </span>

        {this.overflow ? (
          <div class="trim-wrapper">
            <span class="left">
              <span>{trimmedText.left}</span>
            </span>
            <span class="ellipsis">{ELLIPSIS}</span>
            <span class="right">
              <span>{trimmedText.right}</span>
            </span>
          </div>
        ) : (
          <span>{this.text}</span>
        )}
      </span>
    );
  }

  private getTrimmedText() {
    const middleIndex = Math.floor(this.text.length / 2);
    return {
      left: this.text.slice(0, middleIndex),
      right: this.text.slice(middleIndex),
    };
  }
}
