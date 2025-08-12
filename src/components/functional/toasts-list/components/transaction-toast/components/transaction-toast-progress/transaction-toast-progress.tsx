import { Component, Fragment, h, Prop, State, Watch } from '@stencil/core';
import classNames from 'classnames';

const DEFAULT_INFINITE_ANIMATION_DURATION = 30;

@Component({
  tag: 'mvx-transaction-toast-progress',
  styleUrl: 'transaction-toast-progress.scss',
})
export class ToastProgress {
  private timeElapsedTimeoutReference?: ReturnType<typeof setTimeout>;
  private intervalId?: ReturnType<typeof setInterval>;

  @Prop() startTime?: number;
  @Prop() endTime?: number;
  @Prop() isStatusPending?: boolean;

  @State() currentTimestamp: number = Date.now() / 1000;
  @State() hasTimeElapsed: boolean = false;
  @State() expectedTransactionDuration: number = 0;
  @State() secondsPassedSinceStart: number = 0;
  @State() shouldShowProgressBar: boolean = false;
  @State() percentagePassedSinceStart: number = 0;
  @State() shouldQuickFill: boolean = false;
  @State() infiniteProgressDelay: number = 0;
  @State() infinitePercentagePassedSinceStart: number = 0;
  @State() infinitePercentageAnimationDuration: number = DEFAULT_INFINITE_ANIMATION_DURATION;

  componentWillLoad() {
    this.updateProgress();
  }

  componentDidLoad() {
    this.intervalId = setInterval(() => {
      this.updateProgress();
    }, 1000);
  }

  disconnectedCallback() {
    if (this.timeElapsedTimeoutReference) {
      clearTimeout(this.timeElapsedTimeoutReference);
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  @Watch('startTime')
  @Watch('endTime')
  @Watch('isStatusPending')
  handleTimeChange() {
    this.updateProgress();
  }

  private updateProgress() {
    const hasValidTimestamps = typeof this.startTime === 'number' && typeof this.endTime === 'number';

    if (!hasValidTimestamps || this.startTime >= this.endTime) {
      this.shouldShowProgressBar = false;
      this.shouldQuickFill = true;
      clearTimeout(this.timeElapsedTimeoutReference);
      this.timeElapsedTimeoutReference = setTimeout(() => {
        this.hasTimeElapsed = true;
      }, 500);
      return;
    }

    this.shouldShowProgressBar = true;
    this.currentTimestamp = Date.now() / 1000;
    this.expectedTransactionDuration = this.endTime - this.startTime;
    this.secondsPassedSinceStart = this.currentTimestamp - this.startTime;
    this.percentagePassedSinceStart =
      this.expectedTransactionDuration > 0
        ? Math.min((this.secondsPassedSinceStart / this.expectedTransactionDuration) * 100, 100)
        : 0;

    this.infinitePercentageAnimationDuration =
      DEFAULT_INFINITE_ANIMATION_DURATION + this.expectedTransactionDuration * 2;

    this.infiniteProgressDelay = Math.max(0, this.expectedTransactionDuration - this.secondsPassedSinceStart);
    this.infinitePercentagePassedSinceStart =
      (this.secondsPassedSinceStart / (this.expectedTransactionDuration + this.infinitePercentageAnimationDuration)) *
      100;

    if (this.expectedTransactionDuration > 0 && !this.isStatusPending) {
      clearTimeout(this.timeElapsedTimeoutReference);
      this.timeElapsedTimeoutReference = setTimeout(
        () => {
          this.hasTimeElapsed = true;
        },
        this.expectedTransactionDuration * 1000 + 2000,
      );
    }
  }

  render() {
    return (
      <Fragment>
        <div class="transaction-toast-bar-wrapper" style={{ opacity: this.hasTimeElapsed ? '0' : '1' }}>
          <div
            class="transaction-toast-bar-fixed"
            style={{
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
