import { Edge } from '../Model/edge';
import { Point } from '../Model/point';

test('Test Edges Intersection', () => {
  let e1 = new Edge(new Point(0.5,0),new Point(0.5,0.5));
  let e2 = new Edge(new Point(1,0),new Point(0,1));
  let e2o = new Edge(new Point(2,0),new Point(1,1));

  let e3 = new Edge(new Point(0,0),new Point(1,1));
  let e4 = new Edge(new Point(1,0),new Point(0,1));
  let p34 = e3.intersectEdge(e4);
  let p43 = e4.intersectEdge(e3);

  expect(e1.intersectEdge(e1)).toBe(null); // Colinear, no intersection
  expect(e2.intersectEdge(e2o)).toBe(null); // Parallel, no intersection
  expect(e2o.intersectEdge(e2)).toBe(null);
  expect(e1.intersectEdge(e2)).toBe(null); // Endpoint does not count as intersection
  expect(e2.intersectEdge(e1)).toBe(null);
  expect(p34.x).toBe(0.5);
  expect(p34.y).toBe(0.5);
  expect(p43.x).toBe(p34.x);
  expect(p43.y).toBe(p34.y);
});

test('Test Edges Intersection Out of Range', () => {
  let e1 = new Edge(new Point(0.5,0),new Point(0.4,0.5));
  let e2 = new Edge(new Point(1,0.25),new Point(0.25,1));

  expect(e1.intersectEdge(e2)).toBe(null);
});


test('Test Mirror Edges', () => {
  let e1 = new Edge(new Point(0.5,0),new Point(0.5,0.5));
  let e2 = new Edge(new Point(1,0),new Point(0,1));

  e1.mirror(e2);
  e2.mirror(e2);


  expect(e1.p1.x).toBe(1);
  expect(e1.p1.y).toBe(0.5);
  expect(e1.p2.x).toBe(0.5);
  expect(e1.p2.y).toBe(0.5);

  expect(e2.p1.x).toBe(1); // Reflect it self, nothing changed
  expect(e2.p1.y).toBe(0);
  expect(e2.p2.x).toBe(0);
  expect(e2.p2.y).toBe(1);
});
