import { Crease } from '../Model/crease';
import { Fold } from '../Model/fold';
import { Design } from '../Model/design';
import { Edge } from '../Model/edge';
import { Point } from '../Model/point';

test('Fold should not happen when face with ID does not exists', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Fold([3],[crease1],[1]))).toBe(false);
  expect(design.addStep(new Fold([1],[crease1],[1]))).toBe(true);
})

test('Fold should not happen when fold direction is not feasible', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[2]))).toBe(false);
  expect(design.addStep(new Fold([1],[crease1],[-2]))).toBe(false);
})

test('Fold should not happen when face does not have fold edge', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  let crease2 = new Edge(new Point(0,1),new Point(1,0));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Fold([1],[crease2],[1]))).toBe(false);
})

test('Fold should not happen when face folded penetrates crease', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  let crease2 = new Edge(new Point(0.1,1),new Point(1,0.1));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Crease([2],crease2))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[-1]))).toBe(true);
  expect(design.addStep(new Fold([3],[crease2],[-1]))).toBe(false);
})

test('Fold should not happen when face folded penetrates crease on its edge', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(1,0),new Point(0,1));
  let crease2 = new Edge(new Point(1,0.7),new Point(0.7,1));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[1]))).toBe(true);
  expect(design.addStep(new Crease([1,2],crease2))).toBe(true);
  expect(design.addStep(new Fold([1,4],[crease2,crease2],[1,2]))).toBe(false);
})

test('Fold should not happen when crease of folded face is penetrated by other face', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(1,0),new Point(0,1));
  let crease2 = new Edge(new Point(1,0.75),new Point(0.75,1));
  let crease3 = new Edge(new Point(1,0.3),new Point(0.3,1));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[1]))).toBe(true);
  expect(design.addStep(new Crease([1],crease2))).toBe(true);
  expect(design.addStep(new Crease([2],crease3))).toBe(true);
  expect(design.addStep(new Fold([4],[crease3],[2]))).toBe(false);
})


test('Fold should not happen when face is floating', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[1]))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[1]))).toBe(false);
  expect(design.addStep(new Fold([1],[crease1],[-1]))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[-1]))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[-1]))).toBe(false);
})

test('Fold should not happen when creases are torn apart', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0.5,0),new Point(0.5,1));
  let crease2 = new Edge(new Point(0.5,0.2),new Point(1,0.2));
  let crease3 = new Edge(new Point(0.5,0.4),new Point(1,0.4));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[1]))).toBe(true);
  expect(design.addStep(new Crease([1],crease2))).toBe(true);
  expect(design.addStep(new Crease([2],crease3))).toBe(true);
  expect(design.addStep(new Fold([2,1],[crease3,crease2],[2,1]))).toBe(false);
  expect(design.addStep(new Fold([2],[crease3],[1]))).toBe(false);
  expect(design.addStep(new Fold([2],[crease3],[-1]))).toBe(false);
})

test('Empty layer should be removed when face is fold up and down', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[1]))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[-1]))).toBe(true);

  expect(design.getOrigami(3).layers.length).toBe(1);
})

test('Layers should be correct when folded to top', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[1]))).toBe(true);

  let origami = design.getOrigami(2);
  expect(origami.getFaceByID(1).layer).toBe(1);
  expect(origami.getFaceByID(2).layer).toBe(0);
})

test('Layers should be correct when folded to bottom', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[-1]))).toBe(true);

  let origami = design.getOrigami(2);
  expect(origami.getFaceByID(1).layer).toBe(0);
  expect(origami.getFaceByID(2).layer).toBe(1);
})

test('Layers should be correct when folded to bottom and not overlapped', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  let crease2 = new Edge(new Point(0.5,1),new Point(1,0.5));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Crease([2],crease2))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[-1]))).toBe(true);
  expect(design.addStep(new Fold([3],[crease2],[-1]))).toBe(true);

  let origami = design.getOrigami(4);
  expect(origami.getFaceByID(1).layer).toBe(0);
  expect(origami.getFaceByID(2).layer).toBe(1);
  expect(origami.getFaceByID(3).layer).toBe(0);
})

test('Layers should be correct when folded to bottom and overlapped', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  let crease2 = new Edge(new Point(0.25,1),new Point(1,0.25));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Crease([2],crease2))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[-1]))).toBe(true);
  expect(design.addStep(new Fold([3],[crease2],[-1]))).toBe(true);

  let origami = design.getOrigami(4);
  expect(origami.getFaceByID(1).layer).toBe(0);
  expect(origami.getFaceByID(2).layer).toBe(2);
  expect(origami.getFaceByID(3).layer).toBe(1);
})

test('Layers should be correct when folded to top and not overlapped', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  let crease2 = new Edge(new Point(0.5,1),new Point(1,0.5));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Crease([2],crease2))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[1]))).toBe(true);
  expect(design.addStep(new Fold([3],[crease2],[1]))).toBe(true);

  let origami = design.getOrigami(4);
  expect(origami.getFaceByID(1).layer).toBe(1);
  expect(origami.getFaceByID(2).layer).toBe(0);
  expect(origami.getFaceByID(3).layer).toBe(1);
})

test('Layers should be correct when folded to top and overlapped', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  let crease2 = new Edge(new Point(0.25,1),new Point(1,0.25));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Crease([2],crease2))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[1]))).toBe(true);
  expect(design.addStep(new Fold([3],[crease2],[1]))).toBe(true);

  let origami = design.getOrigami(4);
  expect(origami.getFaceByID(1).layer).toBe(2);
  expect(origami.getFaceByID(2).layer).toBe(0);
  expect(origami.getFaceByID(3).layer).toBe(1);
})

test('Layers should be correct when folded to top and bottom and not overlapped', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  let crease2 = new Edge(new Point(0.5,1),new Point(1,0.5));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Crease([2],crease2))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[-1]))).toBe(true);
  expect(design.addStep(new Fold([3],[crease2],[1]))).toBe(true);

  let origami = design.getOrigami(4);
  expect(origami.getFaceByID(1).layer).toBe(0);
  expect(origami.getFaceByID(2).layer).toBe(1);
  expect(origami.getFaceByID(3).layer).toBe(2);
})

test('Layers should be correct when folded to top and overlapped completely', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0,1/3),new Point(1,1/3));
  let crease2 = new Edge(new Point(0,2/3),new Point(1,2/3));
  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Crease([2],crease2))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[1]))).toBe(true);
  expect(design.addStep(new Fold([3],[crease2],[1]))).toBe(true);

  let origami = design.getOrigami(4);
  expect(origami.getFaceByID(1).layer).toBe(2);
  expect(origami.getFaceByID(2).layer).toBe(0);
  expect(origami.getFaceByID(3).layer).toBe(1);
})
