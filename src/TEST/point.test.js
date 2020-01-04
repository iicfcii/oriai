import { Point } from '../Model/point';
import { Edge } from '../Model/edge';

test('Should not be within if point is outside reactange formed by two points', () => {
  let p1 = new Point(0,0);
  let p2 = new Point(0.5,0);
  let p3 = new Point(1,0);
  expect(p1.isWithinRect(p2,p3)).toBe(false);
});

test('Should be within if point is outside reactange formed by two points', () => {
  let p1 = new Point(0.6,0);
  let p2 = new Point(0.5,0);
  let p3 = new Point(1,0);
  expect(p1.isWithinRect(p2,p3)).toBe(true);
});

test('Should be equal if within tolerance', () => {
  let p1 = new Point(1,1);
  let p2 = new Point(1,1.00000000001);
  expect(p1.isEqual(p2)).toBe(true);
});

test('Should not be equal if not within tolerance', () => {
  let p1 = new Point(1,1);
  let p2 = new Point(1,1.001);
  expect(p1.isEqual(p2)).toBe(false);
});

// test('Should scale point correctly', () => {
//   let p1 = new Point(1,3);
//   expect(p1.scale(2,5,3)[0]).toBe(7);
//   expect(p1.scale(2,5,3)[1]).toBe(9);
// });

test('Should mirror point correctly', () => {
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
