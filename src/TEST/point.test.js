import { Point } from '../Model/point';
import { Edge } from '../Model/edge';

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

test('Test Mirror Points', () => {
  let p1 = new Point(0,1);
  p1.mirror(new Edge(new Point(0,0),new Point(1,1)));

  let p2 = new Point(0,0);
  p2.mirror(new Edge(new Point(1,0),new Point(1,1)));

  let p3 = new Point(1,1);
  p3.mirror(new Edge(new Point(0,0),new Point(1,1)));
  expect(p1.x).toBe(1);
  expect(p1.y).toBe(0);

  expect(p2.x).toBe(2);
  expect(p2.y).toBe(0);

  expect(p3.x).toBe(1);
  expect(p3.y).toBe(1);
});
