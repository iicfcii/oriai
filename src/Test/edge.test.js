import { Edge } from '../Model/edge';
import { Point } from '../Model/point';


test('Should have point when point on edge and not infinite length', () => {
  // Horizontal
  let e1 = new Edge(new Point(0.5,0),new Point(1,0));
  let p1 = new Point(0.8,0);
  expect(e1.hasPoint(p1)).toBe(true);

  // Vertical
  let e2= new Edge(new Point(1,2),new Point(1,5));
  let p2 = new Point(1,4.5);
  expect(e2.hasPoint(p2)).toBe(true);

  // Agnle
  let e3= new Edge(new Point(-1,-1),new Point(5,5));
  let p3 = new Point(2,2);
  expect(e3.hasPoint(p3)).toBe(true);
});

test('Should have point when point on edge and infinite length', () => {
  // Horizontal
  let e1 = new Edge(new Point(0.5,0),new Point(1,0));
  let p1 = new Point(0.8,0);
  expect(e1.hasPoint(p1, true)).toBe(true);

  // Vertical
  let e2= new Edge(new Point(1,2),new Point(1,5));
  let p2 = new Point(1,4.5);
  expect(e2.hasPoint(p2, true)).toBe(true);

  // Agnle
  let e3= new Edge(new Point(-1,-1),new Point(5,5));
  let p3 = new Point(2,2);
  expect(e3.hasPoint(p3, true)).toBe(true);
});

test('Should have point when point on extension of edge and infinite length', () => {
  // Horizontal
  let e1 = new Edge(new Point(0.5,0),new Point(1,0));
  let p1 = new Point(1.8,0);
  expect(e1.hasPoint(p1, true)).toBe(true);

  // Vertical
  let e2= new Edge(new Point(1,2),new Point(1,5));
  let p2 = new Point(1,8);
  expect(e2.hasPoint(p2, true)).toBe(true);

  // Agnle
  let e3= new Edge(new Point(-1,-1),new Point(5,5));
  let p3 = new Point(8,8);
  expect(e3.hasPoint(p3, true)).toBe(true);
});

test('Should not have point when point outside edge and not infinite length', () => {
  // Horizontal
  let e1 = new Edge(new Point(0.5,0),new Point(1,0));
  let p1 = new Point(0,0);
  expect(e1.hasPoint(p1)).toBe(false);

  // Vertical
  let e2= new Edge(new Point(1,2),new Point(1,5));
  let p2 = new Point(1,6);
  expect(e2.hasPoint(p2)).toBe(false);

  // Agnle
  let e3= new Edge(new Point(-1,-1),new Point(5,5));
  let p3 = new Point(1,2);
  expect(e3.hasPoint(p3)).toBe(false);
});

test('Should not intersect when collinear', () => {
  let e1 = new Edge(new Point(0.5,0),new Point(0.5,0.5));

  expect(e1.intersectEdge(e1)).toBe(null);
});

test('Should not intersect when parallel', () => {
  let e1 = new Edge(new Point(1,0),new Point(0,1));
  let e1p = new Edge(new Point(2,0),new Point(1,1));

  expect(e1.intersectEdge(e1p)).toBe(null);
});

test('Should not intersect when only endpoints touching', () => {
  let e1 = new Edge(new Point(0,0),new Point(0.6,0.4));
  let e2 = new Edge(new Point(0,1),new Point(0.6,0.4));
  expect(e1.intersectEdge(e2)).toBe(null);
});

test('Should not intersect when edges not touching', () => {
  let e1 = new Edge(new Point(0.6705882352941175,-0.3176470588235294),new Point(1,0.3));
  let e2 = new Edge(new Point(0,1),new Point(0.6,0.4));
  expect(e1.intersectEdge(e2)).toBe(null);
});

test('Should intersect correctly', () => {
  let e1 = new Edge(new Point(0,0),new Point(1,1));
  let e2 = new Edge(new Point(1,0),new Point(0,1));
  let p12 = e1.intersectEdge(e2);

  expect(p12.x).toBe(0.5);
  expect(p12.y).toBe(0.5);
});


test('Should mirror correctly', () => {
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
