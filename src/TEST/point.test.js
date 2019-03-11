import { Point } from '../Model/point';

test('Point tolerance', () => {
  expect(Point.TOLERANCE).toBe(1e-6);
});
