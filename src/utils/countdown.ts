import type { TimeRemaining } from '../types';

/**
 * Calculates remaining days, hours, minutes, and seconds until target date.
 */
export function calculateTimeRemaining(targetDate: Date, currentDate: Date = new Date()): TimeRemaining {
  const totalMs = targetDate.getTime() - currentDate.getTime();

  if (totalMs <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const totalSeconds = Math.floor(totalMs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return {
    totalMs,
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  };
}

/**
 * Generates a default target date 30 days from the given reference time.
 */
export function getDefaultEventDate(referenceDate: Date = new Date()): Date {
  const target = new Date(referenceDate.getTime());
  target.setDate(target.getDate() + 30);
  target.setHours(9, 0, 0, 0);
  return target;
}
