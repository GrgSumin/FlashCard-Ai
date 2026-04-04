export type Rating = "again" | "hard" | "good" | "easy";

type SM2Result = {
  interval: number;
  easeFactor: number;
  dueDate: Date;
};

const QUALITY_MAP: Record<Rating, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

export function sm2(
  rating: Rating,
  currentInterval: number,
  currentEF: number,
  reviewCount: number
): SM2Result {
  const quality = QUALITY_MAP[rating];

  let interval: number;
  let easeFactor = currentEF;

  if (quality < 3) {
    // Failed — reset
    interval = 1;
  } else {
    if (reviewCount === 0) {
      interval = 1;
    } else if (reviewCount === 1) {
      interval = 6;
    } else {
      interval = Math.round(currentInterval * currentEF);
    }
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + interval);

  return { interval, easeFactor, dueDate };
}
