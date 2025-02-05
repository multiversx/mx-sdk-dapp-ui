import { Component, Fragment, Prop, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'transaction-toast-progress',
  styleUrl: 'transaction-toast-progress.css',
  shadow: true,
})
export class ToastProgress {
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
  @State() infinitePercentageAnimationDuration: number = 60;

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
      setTimeout(() => (this.hasTimeElapsed = true), 500);
      return;
    }

    this.currentTimestamp = Date.now() / 1000;
    this.expectedTransactionDuration = this.endTime - this.startTime;
    this.secondsPassedSinceStart = this.currentTimestamp - this.startTime;
    this.percentagePassedSinceStart = this.expectedTransactionDuration > 0 ? (this.secondsPassedSinceStart / this.expectedTransactionDuration) * 100 : 0;
    this.infiniteProgressDelay = Math.max(0, this.expectedTransactionDuration - this.secondsPassedSinceStart);
    this.infinitePercentagePassedSinceStart = (this.secondsPassedSinceStart / (this.expectedTransactionDuration + this.infinitePercentageAnimationDuration)) * 100;
  }

  render() {
    return (
      <Fragment>
        <div class="transaction-toast-bar-wrapper" style={{ opacity: this.hasTimeElapsed ? '0' : '1' }}>
          <div
            class="transaction-toast-bar fixed"
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

          <div class={`transaction-toast-bar ${this.shouldQuickFill ? 'fill animate' : 'fill'}`} />
        </div>

        <div class="transaction-toast-bar-content">
          <slot />
        </div>
      </Fragment>
    );
  }
}
