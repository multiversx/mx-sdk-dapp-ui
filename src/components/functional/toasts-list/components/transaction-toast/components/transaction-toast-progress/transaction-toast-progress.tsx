import { Component, Fragment, h, Prop, State, Watch } from '@stencil/core';
import classNames from 'classnames';

import { normalizeProgressTimestamps } from './helpers/normalizeProgressTimestamps';

const DEFAULT_INFINITE_ANIMATION_DURATION_MS = 30000;
// The shortest a transaction can possibly take is one block, so a shorter span
// is under-reported data rather than a faster transaction. Pacing the bar over
// a real block keeps it honest about what the chain is actually doing.
const MIN_BLOCK_TIME_MS = 600;
const MIN_UPDATE_INTERVAL_MS = 16;
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
  @Prop() fullWidth?: boolean;

  @State() currentTimestamp: number = Date.now();
  @State() hasTimeElapsed: boolean = false;
  @State() expectedTransactionDurationMs: number = 0;
  @State() msPassedSinceStart: number = 0;
  @State() shouldShowProgressBar: boolean = false;
  @State() percentagePassedSinceStart: number = 0;
  @State() shouldQuickFill: boolean = false;
  @State() infiniteProgressDelayMs: number = 0;
  @State() infinitePercentagePassedSinceStart: number = 0;
  @State() infinitePercentageAnimationDuration: number = DEFAULT_INFINITE_ANIMATION_DURATION_MS;
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
    if (!(this.expectedTransactionDurationMs > 0)) {
      return MAX_UPDATE_INTERVAL_MS;
    }

    const idealInterval = this.expectedTransactionDurationMs / TARGET_UPDATE_COUNT;

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
    const timestamps = normalizeProgressTimestamps(this.startTime, this.endTime);

    if (finishedProgressStatusesMap.includes(this.toastId)) {
      this.shouldShowProgressBar = false;
      this.hasTimeElapsed = true;
      this.clearProgressInterval();
      return;
    }

    if (!timestamps || timestamps.startTime >= timestamps.endTime) {
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
    this.currentTimestamp = Date.now();
    this.expectedTransactionDurationMs = Math.max(MIN_BLOCK_TIME_MS, timestamps.endTime - timestamps.startTime);
    this.msPassedSinceStart = this.currentTimestamp - timestamps.startTime;
    this.percentagePassedSinceStart =
      this.expectedTransactionDurationMs > 0
        ? Math.min((this.msPassedSinceStart / this.expectedTransactionDurationMs) * 100, 100)
        : 0;

    this.infinitePercentageAnimationDuration =
      DEFAULT_INFINITE_ANIMATION_DURATION_MS + this.expectedTransactionDurationMs * 2;

    this.infiniteProgressDelayMs = Math.max(0, this.expectedTransactionDurationMs - this.msPassedSinceStart);
    this.infinitePercentagePassedSinceStart =
      (this.msPassedSinceStart / (this.expectedTransactionDurationMs + this.infinitePercentageAnimationDuration)) * 100;

    const nextUpdateInterval = this.getUpdateInterval();

    if (nextUpdateInterval !== this.updateIntervalMs) {
      this.updateIntervalMs = nextUpdateInterval;
      this.restartProgressInterval();
    }

    if (this.expectedTransactionDurationMs > 0 && !this.isStatusPending) {
      clearTimeout(this.timeElapsedTimeoutReference);
      this.timeElapsedTimeoutReference = setTimeout(() => {
        finishedProgressStatusesMap.push(String(this.toastId));
        this.hasTimeElapsed = true;
      }, this.expectedTransactionDurationMs + 2000);
    }
  }

  render() {
    return (
      <Fragment>
        <div
          class={{
            'mvx-transaction-toast-bar-wrapper': true,
            'mvx:max-w-100': !this.fullWidth,
          }}
          style={{ opacity: this.hasTimeElapsed ? '0' : '1' }}
        >
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
                '--animation-duration': `${this.infinitePercentageAnimationDuration}ms`,
                '--animation-delay': `${this.infiniteProgressDelayMs}ms`,
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
