import { Crease } from '../Model/crease';
import { Fold } from '../Model/fold';
import { Design } from '../Model/design';
import { Edge } from '../Model/edge';
import { Point } from '../Model/point';

test('Should hide all layers', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0.5,0),new Point(0.5,1));
  let crease2 = new Edge(new Point(0.75,0),new Point(0.75,1));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Crease([2],crease2))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[1]))).toBe(true);
  expect(design.addStep(new Fold([3],[crease2],[-1]))).toBe(true);

  let origami = design.getOrigami(4);
  origami.showLayersOnly([]);
  origami.faces.forEach((face) => {
    expect(face.isShown).toBe(false);
  });
})

test('Should show layer 1', () => {
  let design = new Design();
  let crease1 = new Edge(new Point(0.5,0),new Point(0.5,1));
  let crease2 = new Edge(new Point(0.75,0),new Point(0.75,1));

  expect(design.addStep(new Crease([1],crease1))).toBe(true);
  expect(design.addStep(new Crease([2],crease2))).toBe(true);
  expect(design.addStep(new Fold([1],[crease1],[1]))).toBe(true);
  expect(design.addStep(new Fold([3],[crease2],[-1]))).toBe(true);

  let origami = design.getOrigami(4);
  origami.showLayersOnly([1]);
  origami.faces.forEach((face) => {
    if (face.layer === 1){
      expect(face.isShown).toBe(true);
    } else {
      expect(face.isShown).toBe(false);
    }
  });
})
