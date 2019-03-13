import { Point } from '../Model/point';

test('Test Point Tolerance', () => {
  let p1 = new Point(1,1);
  let p2 = new Point(1,1.00000000001);
  let p3 = new Point(1,1.001);
  expect(p1.isEqual(p2)).toBe(true);
  expect(p1.isEqual(p3)).toBe(false);
});

test('Test Scaling Points', () => {
  let p1 = new Point(1,3);
  expect(p1.scale(2,5,3)[0]).toBe(7);
  expect(p1.scale(2,5,3)[1]).toBe(9);
});
