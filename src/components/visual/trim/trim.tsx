import { Component, h, Prop, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { ELLIPSIS } from 'constants/htmlStrings';
import { safeWindow } from 'constants/window.constants';

@Component({
  tag: 'mvx-trim',
  styleUrl: 'trim.scss',
  shadow: false,
})
export class Trim {
  @State() shouldTrim: boolean = false;
  @State() trimFontSize: string = '1rem';

  @Prop() dataTestId?: string = DataTestIdsEnum.trim;
  @Prop() class?: string;
  @Prop() text: string;

  private fullWidthUntrimmedElementReference: HTMLDivElement;
  private trimElementReference: HTMLDivElement;
  private resizeObserver: ResizeObserver;

  componentDidLoad() {
    this.setupResizeObserver();
    requestAnimationFrame(this.checkOverflow);
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }

  private handleTrimElementReference(element: HTMLDivElement) {
    this.trimElementReference = element;
  }

  private handleFullWidthTrimElementReference(element: HTMLDivElement) {
    this.fullWidthUntrimmedElementReference = element;
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.checkOverflow();
    });

    if (this.trimElementReference) {
      this.resizeObserver.observe(this.trimElementReference);
    }
  }

  private checkOverflow = () => {
    if (!this.fullWidthUntrimmedElementReference || !this.trimElementReference) {
      return;
    }

    const hiddenFullWidthElementWidth = this.fullWidthUntrimmedElementReference.offsetWidth;
    const trimmedElementWidth = this.trimElementReference.offsetWidth;
    const isTrimElementOverflowing = hiddenFullWidthElementWidth > trimmedElementWidth;

    if (safeWindow) {
      this.trimFontSize = safeWindow.getComputedStyle(this.trimElementReference).fontSize;
    }

    if (this.shouldTrim !== isTrimElementOverflowing) {
      this.shouldTrim = isTrimElementOverflowing;
    }
  };

  render() {
    const middleTextIndex = Math.floor(this.text.length / 2);
    const leftHandText = this.text.slice(0, middleTextIndex);
    const rightHandText = this.text.slice(middleTextIndex);

    return (
      <div
        data-testid={this.dataTestId}
        ref={this.handleTrimElementReference.bind(this)}
        class={{ trim: true, [this.class]: Boolean(this.class) }}
      >
        <div
          ref={this.handleFullWidthTrimElementReference.bind(this)}
          class={{ 'trim-full': true, 'visible': !this.shouldTrim }}
        >
          {this.text}
        </div>

        <div class={{ 'trim-wrapper': true, 'visible': this.shouldTrim }}>
          <div class="trim-left-wrapper">
            <div class="trim-left" style={{ fontSize: this.trimFontSize }}>
              {leftHandText}
            </div>
          </div>

          <div class="trim-ellipsis-wrapper">
            <div class="trim-ellipsis">{ELLIPSIS}</div>
          </div>

          <div class="trim-right-wrapper">
            <div class="trim-right" style={{ fontSize: this.trimFontSize }}>
              {rightHandText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
