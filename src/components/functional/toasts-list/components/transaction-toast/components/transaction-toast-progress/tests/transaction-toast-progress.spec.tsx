import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { ToastProgress } from '../transaction-toast-progress';

let renderedInstances: ToastProgress[] = [];

let renderedPages: Awaited<ReturnType<typeof newSpecPage>>[] = [];

const renderProgress = async (props: { toastId: string; startTime?: number; endTime?: number }) => {
  const page = await newSpecPage({
    components: [ToastProgress],
    template: () => (
      <mvx-transaction-toast-progress
        toastId={props.toastId}
        startTime={props.startTime}
        endTime={props.endTime}
        isStatusPending={true}
      />
    ),
  });

  renderedInstances.push(page.rootInstance);
  renderedPages.push(page);

  return page.root.querySelector('.mvx-transaction-toast-bar-fixed') as HTMLElement;
};

const renderForDuration = (props: { toastId: string; durationMs: number }) => {
  const startTime = Date.now();

  return renderProgress({ toastId: props.toastId, startTime, endTime: startTime + props.durationMs });
};

// The component polls on an interval; tear it down so the timer does not
// outlive the test and keep the jest worker alive.
const disconnectRendered = () => {
  renderedInstances.forEach(instance => instance.disconnectedCallback());
  renderedInstances = [];
  renderedPages = [];
};

describe('ToastProgress sampling rate', () => {
  afterEach(disconnectRendered);

  it('samples sub-second durations at the minimum interval instead of once per second', async () => {
    // A 600ms round: at the previous 50ms floor the bar only moved ~12 times.
    const bar = await renderForDuration({ toastId: 'sub-second', durationMs: 600 });

    expect(bar.style.getPropertyValue('--transition-duration')).toBe('16ms');
  });

  it('scales the interval to the expected duration', async () => {
    const bar = await renderForDuration({ toastId: 'mid', durationMs: 6000 });

    expect(bar.style.getPropertyValue('--transition-duration')).toBe('100ms');
  });

  it('caps the interval at one second for long durations', async () => {
    const bar = await renderForDuration({ toastId: 'long', durationMs: 600000 });

    expect(bar.style.getPropertyValue('--transition-duration')).toBe('1000ms');
  });

  it('shows a progress bar for a sub-second duration rather than skipping straight to the finished state', async () => {
    const bar = await renderForDuration({ toastId: 'visible', durationMs: 600 });

    expect(bar).not.toBeNull();
    expect(bar.style.getPropertyValue('--start-width')).toMatch(/%$/);
  });
});

describe('ToastProgress minimum block time', () => {
  afterEach(disconnectRendered);

  const expectedDurationOf = () => renderedInstances[renderedInstances.length - 1].expectedTransactionDurationMs;

  it('floors a sub-block span at one block rather than flashing past it', async () => {
    // A transaction cannot resolve faster than a block, so a 200ms span is
    // under-reported data, not a 200ms transaction.
    await renderForDuration({ toastId: 'sub-block', durationMs: 200 });

    expect(expectedDurationOf()).toBe(600);
  });

  it('leaves a span of exactly one block alone', async () => {
    await renderForDuration({ toastId: 'one-block', durationMs: 600 });

    expect(expectedDurationOf()).toBe(600);
  });

  it('leaves a multi-block span alone', async () => {
    await renderForDuration({ toastId: 'multi-block', durationMs: 3000 });

    expect(expectedDurationOf()).toBe(3000);
  });

  it('paces a sub-block span over the full block instead of reporting it complete', async () => {
    const startTime = Date.now() - 200;
    const bar = await renderProgress({ toastId: 'sub-block-width', startTime, endTime: startTime + 200 });

    // 200ms elapsed against a 600ms block, not 200/200 = 100%.
    expect(parseFloat(bar.style.getPropertyValue('--start-width'))).toBeLessThan(50);
  });

  it('still quick-fills an inverted span rather than clamping it to a block', async () => {
    const startTime = Date.now();
    const bar = await renderProgress({ toastId: 'inverted', startTime, endTime: startTime - 5000 });
    const page = renderedPages[renderedPages.length - 1];

    expect(bar.style.getPropertyValue('--start-width')).not.toContain('NaN');
    expect(page.root.querySelector('.mvx-fill').className).toContain('mvx-animate');
  });
});

describe('ToastProgress timestamp units', () => {
  afterEach(disconnectRendered);

  it('treats a second-based pair as the equivalent millisecond pair', async () => {
    const startTimeInSeconds = Math.floor(Date.now() / 1000);

    const bar = await renderProgress({
      toastId: 'legacy-seconds',
      startTime: startTimeInSeconds,
      endTime: startTimeInSeconds + 6,
    });

    // 6s of expected duration, so the same 100ms cadence a 6000ms pair produces.
    expect(bar.style.getPropertyValue('--transition-duration')).toBe('100ms');
  });

  it('emits the infinite animation timings in milliseconds', async () => {
    const startTime = Date.now();

    await renderProgress({ toastId: 'infinite-units', startTime, endTime: startTime + 6000 });

    const instance = renderedInstances[renderedInstances.length - 1];

    // 30000ms base + 2x the 6000ms expected duration.
    expect(instance.infinitePercentageAnimationDuration).toBe(42000);
  });

  it('quick-fills instead of computing a NaN width when a timestamp is not usable', async () => {
    // `typeof NaN === 'number'` passed the old guard, and `NaN >= NaN` is false,
    // so the bar used to render `--start-width: NaN%`.
    const bar = await renderProgress({ toastId: 'not-a-number', startTime: NaN, endTime: Date.now() });
    const page = renderedPages[renderedPages.length - 1];

    expect(bar.style.getPropertyValue('--start-width')).not.toContain('NaN');
    expect(page.root.querySelector('.mvx-fill').className).toContain('mvx-animate');
  });
});
