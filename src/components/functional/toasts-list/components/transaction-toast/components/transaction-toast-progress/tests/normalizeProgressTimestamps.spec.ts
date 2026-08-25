import { normalizeProgressTimestamps } from '../helpers/normalizeProgressTimestamps';

const NOW_MS = 1_764_000_000_000;
const NOW_SECONDS = NOW_MS / 1000;

describe('normalizeProgressTimestamps', () => {
  it('passes millisecond timestamps through untouched', () => {
    expect(normalizeProgressTimestamps(NOW_MS, NOW_MS + 600)).toEqual({
      startTime: NOW_MS,
      endTime: NOW_MS + 600,
    });
  });

  it('scales a second-based pair up to milliseconds', () => {
    expect(normalizeProgressTimestamps(NOW_SECONDS, NOW_SECONDS + 30)).toEqual({
      startTime: NOW_MS,
      endTime: NOW_MS + 30_000,
    });
  });

  it('derives the same duration from a second-based pair as from its millisecond equivalent', () => {
    const fromSeconds = normalizeProgressTimestamps(NOW_SECONDS, NOW_SECONDS + 30);
    const fromMilliseconds = normalizeProgressTimestamps(NOW_MS, NOW_MS + 30_000);

    expect(fromSeconds.endTime - fromSeconds.startTime).toBe(fromMilliseconds.endTime - fromMilliseconds.startTime);
  });

  it('applies one factor to both timestamps, chosen from startTime', () => {
    // A mixed pair must not be split across units: scaling only the seconds half
    // would invent a duration thousands of times too long.
    const { startTime, endTime } = normalizeProgressTimestamps(NOW_SECONDS, NOW_MS);

    expect(startTime).toBe(NOW_MS);
    expect(endTime).toBe(NOW_MS * 1000);
  });

  it('preserves sub-second precision that seconds could not express', () => {
    const { startTime, endTime } = normalizeProgressTimestamps(NOW_MS, NOW_MS + 600);

    expect(endTime - startTime).toBe(600);
  });

  it('returns null when either timestamp is missing', () => {
    expect(normalizeProgressTimestamps(undefined, NOW_MS)).toBeNull();
    expect(normalizeProgressTimestamps(NOW_MS, undefined)).toBeNull();
  });

  it('returns null for non-finite timestamps', () => {
    expect(normalizeProgressTimestamps(NaN, NOW_MS)).toBeNull();
    expect(normalizeProgressTimestamps(NOW_MS, Infinity)).toBeNull();
  });

  it('returns null for non-positive timestamps rather than scaling them', () => {
    expect(normalizeProgressTimestamps(0, NOW_MS)).toBeNull();
    expect(normalizeProgressTimestamps(-NOW_MS, NOW_MS)).toBeNull();
  });
});
