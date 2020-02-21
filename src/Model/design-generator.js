import { Design } from './design';
import { Edge } from './edge';
import { Point } from './point';
import { Crease } from './crease';
import { Fold } from './fold';

export class DesignGenerator {
  constructor(){
    this.design = new Design();
  }

  // max = 2, return 0,1
  getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRandomFaceIDs(){
    let origami = this.design.getOrigami(this.design.origamis.length-1);
    // Random number of faceIDs
    let numFaceIDs = this.getRandomInt(origami.faces.length)+1;
    // Random faceIDs
    let faceIDs = [];
    for (let i = 0; i < numFaceIDs; i ++){
      let id = this.getRandomInt(origami.faces.length)+1
      while (faceIDs.indexOf(id) !== -1){
        // May get stuck here for a while
        id = this.getRandomInt(origami.faces.length)+1
      }
      faceIDs[i] = id;
    }

    return faceIDs;
  }

  addCrease(){
    let faceIDs = this.getRandomFaceIDs();
    // Random crease
    // x and y both from 0 to 1
    let x1 = Math.random();
    let y1 = Math.random();
    let x2 = Math.random();
    let y2 = Math.random();
    let crease = new Edge(new Point(x1, y1),new Point(x2, y2))

    let isSuccessful = this.design.addStep(new Crease(faceIDs,crease));
    if (!isSuccessful) {
      this.addCrease();
      return;
    }
  }

  addFold(){
    let origami = this.design.getOrigami(this.design.origamis.length-1);
    let faceIDs = this.getRandomFaceIDs();
    while (faceIDs.length === origami.faces.length){
      faceIDs = this.getRandomFaceIDs();
    }


    // Find all candidates of creases
    // All faces should share a crease for the fold to be successful
    let face = origami.getFaceByID(faceIDs[0]);
    let creaseCandidates = [];
    face.edges.forEach((edge) => {
      // Make sure is crease
      if (!edge.isCrease) return;

      // Make sure other faces have it
      for (let i = 1; i < faceIDs.length; i ++){
        let f = origami.getFaceByID(faceIDs[i]);
        let indexList = face.edgeIndexList(edge,true,null,true);
        if (indexList.length === 0){
          return;
        }
      }

      creaseCandidates.push(edge);
    });

    if (creaseCandidates.length === 0){
      this.addFold();
      return;
    }

    let crease = creaseCandidates[this.getRandomInt(creaseCandidates.length)];

    let directions = [];
    faceIDs.forEach((id) => {
      let f = origami.getFaceByID(id);
      let directionCandidates = [];
      for (let i = -1; i > origami.minLayer-f.layer-2; i --){
        directionCandidates.push(i);
      }
      for (let i = 1; i < origami.maxLayer-f.layer+2; i ++){
        directionCandidates.push(i);
      }

      directions.push(directionCandidates[this.getRandomInt(directionCandidates.length)]);
    });

    console.log(faceIDs,crease,directions)
    let isSuccessful = this.design.addStep(new Fold(faceIDs,crease,directions));
    if (!isSuccessful) {
      this.addFold();
      return;
    }
  }
}
