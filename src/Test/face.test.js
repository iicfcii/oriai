import { Edge } from '../Model/edge';
import { Point } from '../Model/point';
import { Face } from '../Model/face';

test('Test Face Interset Edge', () => {
  let face = new Face(1); // Starting id is 1
  face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
  face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
  face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
  face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));

  let e1 = face.intersectEdge(new Edge(new Point(0,1),new Point(0,0)));
  let e2 = face.intersectEdge(new Edge(new Point(0.25,0.5),new Point(0.75,0.5)));
  let e3 = face.intersectEdge(new Edge(new Point(0,0),new Point(0.5,0.5)));
  let e4 = face.intersectEdge(new Edge(new Point(0,0),new Point(1,1)));
  let e5 = face.intersectEdge(new Edge(new Point(0.5,0),new Point(0.5,1)));
  let e6 = face.intersectEdge(new Edge(new Point(0.5,0.1),new Point(0.5,0.9)), true);
  let e7 = face.intersectEdge(new Edge(new Point(0.1,0.1),new Point(0.8,0.8)), true);


  expect(e1).toBe(null);
  expect(e2).toBe(null);
  expect(e3).toBe(null);
  expect(e4.isEqual(new Edge(new Point(0,0),new Point(1,1)))).toBe(true);
  expect(e5.isEqual(new Edge(new Point(0.5,0),new Point(0.5,1)))).toBe(true);
  expect(e6.isEqual(new Edge(new Point(0.5,0),new Point(0.5,1)), true)).toBe(true);
  expect(e7.isEqual(new Edge(new Point(0,0),new Point(1,1)), true)).toBe(true);
});

test('Test Face Edge Index', () => {
  let face = new Face(1); // Starting id is 1
  face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
  face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
  face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
  face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));

  let e1 = new Edge(new Point(0,1),new Point(0,0));
  let e2 = new Edge(new Point(0,0.5),new Point(0,0));
  let e3 = new Edge(new Point(0.5,0.5),new Point(0.7,0.7));
  let e4 = new Edge(new Point(1,0),new Point(1,1));
  expect(face.edgeIndex(e1)).toBe(3);
  expect(face.edgeIndex(e1, true)).toBe(3);
  expect(face.edgeIndex(e2)).toBe(-1);
  expect(face.edgeIndex(e2, true)).toBe(3);
  expect(face.edgeIndex(e3)).toBe(-1);
  expect(face.edgeIndex(e3, true)).toBe(-1);
  expect(face.edgeIndex(e4)).toBe(1);
  expect(face.edgeIndex(e4, true)).toBe(1);
});
