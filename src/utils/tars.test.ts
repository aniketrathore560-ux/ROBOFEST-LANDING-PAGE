import test from 'node:test';
import assert from 'node:assert/strict';
import { getTarsResponseForQuestion } from './tars';

test('getTarsResponseForQuestion returns valid response for question 1', () => {
  const res = getTarsResponseForQuestion(1, 75, 90);
  assert.equal(res.headline, 'WEIGHT & WEAPON LIMITS');
  assert.equal(res.actionPose, 'articulating');
  assert.ok(res.commentary.includes('Featherweight 15kg'));
});

test('getTarsResponseForQuestion responds to humor level parameter', () => {
  const highHumor = getTarsResponseForQuestion(4, 90, 90);
  assert.ok(highHumor.commentary.includes('this is no time for caution'));

  const lowHumor = getTarsResponseForQuestion(4, 30, 90);
  assert.ok(lowHumor.commentary.includes('Sensors must withstand'));
});

test('getTarsResponseForQuestion returns default state for unknown question', () => {
  const fallback = getTarsResponseForQuestion(999);
  assert.equal(fallback.headline, 'SYSTEM READY');
  assert.equal(fallback.actionPose, 'idle');
});
