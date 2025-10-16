import { Component, h, Prop, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { safeWindow } from 'constants/window.constants';
import { Trim as TrimComponent } from 'common/Trim/Trim';

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
    return <TrimComponent
      class={this.class}
      dataTestId={this.dataTestId}
      text={this.text}
      shouldTrim={this.shouldTrim}
      trimFontSize={this.trimFontSize}
      onTrimElementReference={this.handleTrimElementReference.bind(this)}
      onFullWidthTrimElementReference={this.handleFullWidthTrimElementReference.bind(this)}
    />;
  }
}