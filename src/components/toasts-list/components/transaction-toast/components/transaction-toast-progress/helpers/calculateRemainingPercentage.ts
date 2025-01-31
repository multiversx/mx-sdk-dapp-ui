import { progressiveDecrement } from './progressiveDecrement';

interface ICalculateRemainingProps {
  startTime: number;
  totalDuration: number;
  currentTime: number;
}

export const calculateRemainingPercentage = ({ startTime, totalDuration, currentTime }: ICalculateRemainingProps) => {
  const elapsedTime = currentTime - startTime;
  let remainingTime = Math.max(totalDuration - elapsedTime, 0.1);

  // Base remaining percentage
  let remainingPercentage = (remainingTime / totalDuration) * 100;

  // Apply progressive decrement
  const adjustedRemaining = progressiveDecrement(remainingPercentage);
  let finalRemainingPercentage = Math.max(remainingPercentage - adjustedRemaining, 0.1);

  // Gradual boost when below 50%
  if (finalRemainingPercentage < 50) {
    const boostFactor = 1 + (50 - finalRemainingPercentage) / 100;
    finalRemainingPercentage *= boostFactor;
  }

  // **Stronger boost when very low**
  if (finalRemainingPercentage < 5) {
    finalRemainingPercentage += (5 - finalRemainingPercentage) * 2.5;
  }

  // Ensure it never exceeds 100%
  finalRemainingPercentage = Math.min(finalRemainingPercentage, 100);

  return finalRemainingPercentage;
};
