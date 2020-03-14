import { Crease } from '../Model/Crease';
import { Fold } from '../Model/Fold';
import { Design } from '../Model/Design';
import { Edge } from '../Model/Edge';
import { Point } from '../Model/Point';

test('Twin creases should have same parent faces', () => {
  let design = new Design();

  let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
  let crease2 = new Edge(new Point(0.5,0.5),new Point(1,1));

  expect(design.addStep(new Crease([1],crease1))).toBe(Crease.RESULT_SUCCESSFUL);
  expect(design.addStep(new Fold([1],crease1,[1]))).toBe(Fold.RESULT_SUCCESSFUL);
  expect(design.addStep(new Crease([1],crease2))).toBe(Crease.RESULT_SUCCESSFUL);

  let origami = design.getOrigami(3);
  expect(origami.getFaceByID(1).edges[2].parentFace1.id)
    .toBe(origami.getFaceByID(1).edges[2].twin.parentFace2.id);
  expect(origami.getFaceByID(1).edges[1].parentFace1.id)
    .toBe(origami.getFaceByID(1).edges[1].twin.parentFace2.id);
})
