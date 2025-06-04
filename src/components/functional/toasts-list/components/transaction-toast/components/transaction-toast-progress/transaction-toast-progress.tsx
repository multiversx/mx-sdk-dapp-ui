import { Component, Fragment, h, Prop, State, Watch } from '@stencil/core';
import classNames from 'classnames';

const DEFAULT_INFINITE_ANIMATION_DURATION = 30;

@Component({
  tag: 'mvx-transaction-toast-progress',
  styleUrl: 'transaction-toast-progress.scss',
})
export class ToastProgress {
  private timeElapsedTimeoutReference?: ReturnType<typeof setTimeout>;

  @Prop() startTime?: number;
  @Prop() endTime?: number;

  @State() currentTimestamp: number = Date.now() / 1000;
  @State() hasTimeElapsed: boolean = false;
  @State() expectedTransactionDuration: number = 0;
  @State() secondsPassedSinceStart: number = 0;
  @State() shouldShowProgressBar: boolean = false;
  @State() percentagePassedSinceStart: number = 0;
  @State() shouldQuickFill: boolean = false;
  @State() infiniteProgressDelay: number = 0;
  @State() infinitePercentagePassedSinceStart: number = 0;
  @State() infinitePercentageAnimationDuration: number =
    DEFAULT_INFINITE_ANIMATION_DURATION + (this.endTime - this.startTime) * 2;

  componentWillLoad() {
    this.updateProgress();
  }

  @Watch('startTime')
  @Watch('endTime')
  handleTimeChange() {
    this.updateProgress();
  }

  private updateProgress() {
    this.shouldShowProgressBar = Boolean(this.endTime) && Boolean(this.startTime);

    if (!this.shouldShowProgressBar) {
      this.shouldQuickFill = true;
      this.timeElapsedTimeoutReference = setTimeout(() => (this.hasTimeElapsed = true), 500);
      return;
    }

    this.currentTimestamp = Date.now() / 1000;
    this.expectedTransactionDuration = this.endTime - this.startTime;
    this.secondsPassedSinceStart = this.currentTimestamp - this.startTime;
    this.percentagePassedSinceStart =
      this.expectedTransactionDuration > 0
        ? (this.secondsPassedSinceStart / this.expectedTransactionDuration) * 100
        : 0;
    this.infiniteProgressDelay = Math.max(0, this.expectedTransactionDuration - this.secondsPassedSinceStart);
    this.infinitePercentagePassedSinceStart =
      (this.secondsPassedSinceStart / (this.expectedTransactionDuration + this.infinitePercentageAnimationDuration)) *
      100;
  }

  disconnectedCallback() {
    if (this.timeElapsedTimeoutReference) {
      clearTimeout(this.timeElapsedTimeoutReference);
    }
  }

  render() {
    return (
      <Fragment>
        <div class="transaction-toast-bar-wrapper" style={{ opacity: this.hasTimeElapsed ? '0' : '1' }}>
          <div
            class="transaction-toast-bar-fixed"
            style={{
              '--animation-duration': `${this.expectedTransactionDuration}s`,
              '--start-width': `${this.percentagePassedSinceStart}%`,
            }}
          />

          <div class="transaction-toast-bar infinite">
            <div
              class="transaction-toast-bar-line"
              style={{
                '--start-width': `${this.infinitePercentagePassedSinceStart}%`,
                '--animation-duration': `${this.infinitePercentageAnimationDuration}s`,
                '--animation-delay': `${this.infiniteProgressDelay}s`,
              }}
            />
          </div>

          <div
            class={classNames('transaction-toast-bar fill', {
              animate: this.shouldQuickFill,
            })}
          />
        </div>

        <div class="transaction-toast-bar-content">
          <slot />
        </div>
      </Fragment>
    );
  }
}
