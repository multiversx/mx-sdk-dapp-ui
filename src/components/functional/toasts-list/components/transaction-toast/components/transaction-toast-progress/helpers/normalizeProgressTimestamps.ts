const SECONDS_THRESHOLD = 1e11;

const isUsableTimestamp = (timestamp?: number) =>
  typeof timestamp === 'number' && Number.isFinite(timestamp) && timestamp > 0;

export interface INormalizedProgressTimestamps {
  startTime: number;
  endTime: number;
}

export const normalizeProgressTimestamps = (
  startTime?: number,
  endTime?: number,
): INormalizedProgressTimestamps | null => {
  if (!isUsableTimestamp(startTime) || !isUsableTimestamp(endTime)) {
    return null;
  }

  const factor = startTime < SECONDS_THRESHOLD ? 1000 : 1;

  return { startTime: startTime * factor, endTime: endTime * factor };
};
