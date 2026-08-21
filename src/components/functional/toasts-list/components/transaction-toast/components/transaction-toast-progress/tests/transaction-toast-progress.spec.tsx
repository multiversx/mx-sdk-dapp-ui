import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { ToastProgress } from '../transaction-toast-progress';

const nowInSeconds = () => Date.now() / 1000;

const renderProgress = async (props: { toastId: string; durationInSeconds: number }) => {
  const startTime = nowInSeconds();

  const page = await newSpecPage({
    components: [ToastProgress],
    template: () => (
      <mvx-transaction-toast-progress
        toastId={props.toastId}
        startTime={startTime}
        endTime={startTime + props.durationInSeconds}
        isStatusPending={true}
      />
    ),
  });

  return page.root.querySelector('.mvx-transaction-toast-bar-fixed') as HTMLElement;
};

describe('ToastProgress sampling rate', () => {
  // Fake timers keep the component's polling interval from outliving the test.
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('samples sub-second durations at the minimum interval instead of once per second', async () => {
    // A 600ms round duration: at the previous fixed 1s tick the bar never moved.
    const bar = await renderProgress({ toastId: 'sub-second', durationInSeconds: 0.6 });

    expect(bar.style.getPropertyValue('--transition-duration')).toBe('50ms');
  });

  it('scales the interval to the expected duration', async () => {
    const bar = await renderProgress({ toastId: 'mid', durationInSeconds: 6 });

    expect(bar.style.getPropertyValue('--transition-duration')).toBe('100ms');
  });

  it('caps the interval at one second for long durations', async () => {
    const bar = await renderProgress({ toastId: 'long', durationInSeconds: 600 });

    expect(bar.style.getPropertyValue('--transition-duration')).toBe('1000ms');
  });

  it('shows a progress bar for a sub-second duration rather than skipping straight to the finished state', async () => {
    const bar = await renderProgress({ toastId: 'visible', durationInSeconds: 0.6 });

    expect(bar).not.toBeNull();
    expect(bar.style.getPropertyValue('--start-width')).toMatch(/%$/);
  });
});
