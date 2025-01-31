import { Component, Prop, State, h } from '@stencil/core';
import { calculateRemainingPercentage } from './helpers/calculateRemainingPercentage';
import { getRemainingValue, PROGRESS_INTERVAL_DURATION_MS } from './helpers/getRemainingValue';

@Component({
  tag: 'transaction-toast-progress',
  styleUrl: 'transaction-toast-progress.css',
  shadow: true,
})
export class ToastProgress {
  @Prop() progressClass: string = 'transaction-toast-progress';
  @Prop() startTime?: number;
  @Prop() endTime?: number;
  @Prop() isCrossShard: boolean = false;

  @State() currentRemaining: number | undefined;

  private intervalId?: ReturnType<typeof setInterval>;

  componentWillLoad() {
    this.updateRemaining();
    this.startInterval();
  }

  disconnectedCallback() {
    clearInterval(this.intervalId);
  }

  private updateRemaining = () => {
    if (!this.startTime || !this.endTime) {
      this.currentRemaining = 0;
      return;
    }
    const totalDuration = this.endTime - this.startTime;
    const now = Date.now() / 1000;

    let remainingPercent = this.currentRemaining ?? calculateRemainingPercentage({ currentTime: now, startTime: this.startTime, totalDuration });

    this.currentRemaining = getRemainingValue({
      remaining: remainingPercent,
      totalSeconds: totalDuration,
      isCrossShard: this.isCrossShard,
    });
  };

  private startInterval() {
    this.intervalId = setInterval(() => {
      this.updateRemaining();
    }, PROGRESS_INTERVAL_DURATION_MS);
  }

  render() {
    return (
      <div class={this.progressClass}>
        <div
          class="transaction-toast-bar"
          style={{ width: `${this.currentRemaining}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valnow={this.currentRemaining}
        />
        <slot></slot>
      </div>
    );
  }
}
