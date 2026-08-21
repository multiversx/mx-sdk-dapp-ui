import { Component, Fragment, h, Prop, State, Watch } from '@stencil/core';
import classNames from 'classnames';

const DEFAULT_INFINITE_ANIMATION_DURATION = 30;
const MIN_UPDATE_INTERVAL_MS = 50;
const MAX_UPDATE_INTERVAL_MS = 1000;
const TARGET_UPDATE_COUNT = 60;
const finishedProgressStatusesMap: string[] = [];

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
  @Prop() toastId?: string;

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
  @State() updateIntervalMs: number = MAX_UPDATE_INTERVAL_MS;

  componentWillLoad() {
    this.updateProgress();
  }

  componentDidLoad() {
    this.restartProgressInterval();
  }

  disconnectedCallback() {
    if (this.timeElapsedTimeoutReference) {
      clearTimeout(this.timeElapsedTimeoutReference);
    }

    this.clearProgressInterval();
  }

  @Watch('startTime')
  @Watch('endTime')
  @Watch('isStatusPending')
  handleTimeChange() {
    this.updateProgress();
    this.restartProgressInterval();
  }

  private getUpdateInterval() {
    if (!(this.expectedTransactionDuration > 0)) {
      return MAX_UPDATE_INTERVAL_MS;
    }

    const idealInterval = (this.expectedTransactionDuration * 1000) / TARGET_UPDATE_COUNT;

    return Math.min(MAX_UPDATE_INTERVAL_MS, Math.max(MIN_UPDATE_INTERVAL_MS, idealInterval));
  }

  private clearProgressInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private restartProgressInterval() {
    this.clearProgressInterval();

    if (this.hasTimeElapsed) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.updateProgress();
    }, this.updateIntervalMs);
  }

  private updateProgress() {
    const hasValidTimestamps = typeof this.startTime === 'number' && typeof this.endTime === 'number';

    if (finishedProgressStatusesMap.includes(this.toastId)) {
      this.shouldShowProgressBar = false;
      this.hasTimeElapsed = true;
      this.clearProgressInterval();
      return;
    }

    if (!hasValidTimestamps || this.startTime >= this.endTime) {
      this.shouldShowProgressBar = false;
      this.shouldQuickFill = true;
      // Nothing left to sample: keeping the interval alive would re-arm the
      // timeout below on every tick and it would never fire.
      this.clearProgressInterval();
      clearTimeout(this.timeElapsedTimeoutReference);
      this.timeElapsedTimeoutReference = setTimeout(() => {
        finishedProgressStatusesMap.push(this.toastId);
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

    const nextUpdateInterval = this.getUpdateInterval();

    if (nextUpdateInterval !== this.updateIntervalMs) {
      this.updateIntervalMs = nextUpdateInterval;
      this.restartProgressInterval();
    }

    if (this.expectedTransactionDuration > 0 && !this.isStatusPending) {
      clearTimeout(this.timeElapsedTimeoutReference);
      this.timeElapsedTimeoutReference = setTimeout(
        () => {
          finishedProgressStatusesMap.push(this.toastId);
          this.hasTimeElapsed = true;
        },
        this.expectedTransactionDuration * 1000 + 2000,
      );
    }
  }

  render() {
    return (
      <Fragment>
        <div class="mvx-transaction-toast-bar-wrapper" style={{ opacity: this.hasTimeElapsed ? '0' : '1' }}>
          <div
            class="mvx-transaction-toast-bar-fixed"
            style={{
              '--start-width': `${this.percentagePassedSinceStart}%`,
              '--transition-duration': `${this.updateIntervalMs}ms`,
            }}
          />

          <div class="mvx-transaction-toast-bar mvx-infinite">
            <div
              class="mvx-transaction-toast-bar-line"
              style={{
                '--start-width': `${this.infinitePercentagePassedSinceStart}%`,
                '--animation-duration': `${this.infinitePercentageAnimationDuration}s`,
                '--animation-delay': `${this.infiniteProgressDelay}s`,
              }}
            />
          </div>

          <div
            class={classNames('mvx-transaction-toast-bar mvx-fill', {
              'mvx-animate': this.shouldQuickFill,
            })}
          />
        </div>

        <div class="mvx-transaction-toast-bar-content">
          <slot />
        </div>
      </Fragment>
    );
  }
}
