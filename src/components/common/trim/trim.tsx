import { Component, h, Prop, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { ELLIPSIS } from 'constants/htmlStrings';
import { safeWindow } from 'constants/window.constants';

// prettier-ignore
const styles = {
  trim: 'trim mvx:flex mvx:relative mvx:max-w-full mvx:overflow-hidden mvx:whitespace-nowrap',
  trimFull: 'trim-full mvx:text-transparent mvx:absolute mvx:leading-5',
  trimFullVisible: 'trim-full-visible mvx:!text-inherit mvx:relative mvx:leading-5',
  trimWrapper: 'trim-wrapper mvx:hidden',
  trimWrapperVisible: 'trim-wrapper-visible mvx:overflow-hidden mvx:max-w-full mvx:flex',
  trimEllipsisWrapper: 'trim-ellipsis-wrapper mvx:block mvx:flex-shrink-0 mvx:pointer-events-none mvx:select-none',
  trimEllipsis: 'trim-ellipsis mvx:block mvx:leading-5',
  trimLeftWrapper: 'trim-left-wrapper mvx:flex-shrink mvx:text-ellipsis mvx:overflow-hidden mvx:text-left mvx:text-[1px]',
  trimLeft: 'trim-left mvx:select-none mvx:pointer-events-none mvx:inline mvx:text-base mvx:leading-5 mvx:-webkit-letter-spacing',
  trimRightWrapper: 'trim-right-wrapper mvx:flex-shrink mvx:text-ellipsis mvx:overflow-hidden mvx:whitespace-nowrap mvx:text-right mvx:text-[1px]',
  trimRight: 'trim-right mvx:select-none mvx:pointer-events-none mvx:inline mvx:text-base mvx:leading-5 mvx:text-clip mvx:-webkit-letter-spacing',
  trimStoriesWrapper: 'trim-stories-wrapper mvx:text-primary'
} satisfies Record<string, string>;

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
    this.resizeObserver?.disconnect?.();
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
        class={{ [styles.trim]: true, [this.class]: Boolean(this.class) }}
      >
        <div
          data-testid={DataTestIdsEnum.trimFullAddress}
          ref={this.handleFullWidthTrimElementReference.bind(this)}
          class={{ [styles.trimFull]: true, [styles.trimFullVisible]: !this.shouldTrim }}
        >
          {this.text}
        </div>

        <div class={{ [styles.trimWrapper]: true, [styles.trimWrapperVisible]: this.shouldTrim }}>
          <div class={styles.trimLeftWrapper}>
            <div class={styles.trimLeft} style={{ fontSize: this.trimFontSize }}>
              {leftHandText}
            </div>
          </div>

          <div class={styles.trimEllipsisWrapper}>
            <div class={styles.trimEllipsis}>{ELLIPSIS}</div>
          </div>

          <div class={styles.trimRightWrapper}>
            <div class={styles.trimRight} style={{ fontSize: this.trimFontSize }}>
              {rightHandText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
