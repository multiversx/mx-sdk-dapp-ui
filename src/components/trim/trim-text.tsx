import { Component, Prop, h, State, Element } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { ELLIPSIS } from 'constants/htmlStrings';

@Component({
  tag: 'trim-text',
  styleUrl: 'trim-text.css',
  shadow: true,
})
export class TrimText {
  @Element() el: HTMLElement;

  @Prop() text: string;
  @Prop() class?: string = 'trim';
  @Prop() dataTestId: string = DataTestIdsEnum.trim;

  @State() overflow: boolean = false;

  private trimRef: HTMLSpanElement;
  private hiddenTextRef: HTMLSpanElement;

  private resizeObserver: ResizeObserver;

  componentWillLoad() {
    this.checkOverflow();
    this.setupResizeObserver();
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    window.removeEventListener('resize', this.checkOverflow);
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.checkOverflow();
    });

    if (this.trimRef && this.hiddenTextRef) {
      this.resizeObserver.observe(this.hiddenTextRef);
      this.resizeObserver.observe(this.trimRef);
    }

    window.addEventListener('resize', this.checkOverflow);
  }

  private checkOverflow() {
    if (this.hiddenTextRef && this.trimRef) {
      const diff = this.hiddenTextRef.offsetWidth - this.trimRef.offsetWidth;
      this.overflow = diff > 1;
    }
  }

  render() {
    return (
      <span ref={el => (this.trimRef = el as HTMLSpanElement)} class={classNames(this.class, { overflow: this.overflow })} data-testid={this.dataTestId}>
        <span ref={el => (this.hiddenTextRef = el as HTMLSpanElement)} class="hidden-text">
          {this.text}
        </span>

        {this.overflow ? (
          <div>
            <span class="left">
              <span>{String(this.text).substring(0, Math.floor(this.text.length / 2))}</span>
            </span>

            <span class="ellipsis">{ELLIPSIS}</span>

            <span class="right">
              <span>{String(this.text).substring(Math.ceil(this.text.length / 2))}</span>
            </span>
          </div>
        ) : (
          <span>{this.text}</span>
        )}
      </span>
    );
  }
}
