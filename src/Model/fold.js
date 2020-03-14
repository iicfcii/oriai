export class Fold {
  static RESULT_SUCCESSFUL = 0;
  static RESULT_MISSING_TWIN = 1;
  static RESULT_PENETRATING_CREASE = 2;
  static RESULT_INVALID_FACEID = 3;
  static RESULT_INVALID_FOLD_CREASE = 4;
  static RESULT_INVALID_FOLD_DIRECTION = 5;

  constructor(faceIDs, crease, directions){
    this.faceIDs = faceIDs;
    this.crease = crease;
    this.directions = directions;
  }

  getDescription(){
    return 'Fold faces ' + this.faceIDs + ' along line (' +
           this.crease.p1.x.toFixed(2) + ', '+ this.crease.p1.y.toFixed(2) + ') to (' +
           this.crease.p2.x.toFixed(2) + ', '+ this.crease.p2.y.toFixed(2) + ')' +
           ' up ' + this.directions + ' layers';
  }

  isSuccessful(code){
    return code === Fold.RESULT_SUCCESSFUL;
  }

  getResult(code){
    switch(code){
      case Fold.RESULT_SUCCESSFUL:
        return 'Successful';
      case Fold.RESULT_MISSING_TWIN:
        return 'Crease is torn apart';
      case Fold.RESULT_PENETRATING_CREASE:
        return 'Crease is penetrated';
      case Fold.RESULT_INVALID_FACEID:
        return 'Face selected does not exist';
        // Probably won't happen because of how selection works.
      case Fold.RESULT_INVALID_FOLD_CREASE:
        return 'Fold crease selected is not valid';
      case Fold.RESULT_INVALID_FOLD_DIRECTION:
        return 'Fold direction is not valid';
      default:
        return 'Unknown result code';
    }
  }

  getObject(){
    return {
      faces: this.faceIDs,
      // x1,y1,x2,y2
      edge: [this.crease.p1.x, this.crease.p1.y, this.crease.p2.x, this.crease.p2.y],
      directions: this.directions,
    }
  }

  do(origami){
    let result = Fold.RESULT_SUCCESSFUL;
    let isFoldFailed = this.faceIDs.some((faceID, index) => {
      result = this.singleFold(origami, faceID, this.crease, this.directions[index]);
      return result !== Fold.RESULT_SUCCESSFUL;
    });
    if (isFoldFailed) return result;

    // Crease twin cannot be found
    let missingTwin = this.faceIDs.some((faceID) => {
      return origami.getFaceByID(faceID).edges.some((edge) => {
        if (!edge.isCrease) return false;
        return edge.twin === null;
      });
    });
    // console.log('missingTwin', missingTwin);
    if (missingTwin){
      // console.log('Missing twin');
      return Fold.RESULT_MISSING_TWIN;
    };

    // Check penetration
    let isPenetrating = false;
    this.faceIDs.forEach((faceID,index) => {
      let face = origami.getFaceByID(faceID);
      let crease = this.crease;
      // Whether this face penetrates other creases
      isPenetrating = isPenetrating || origami.faces.some((f) => {
        return f.id !== face.id && f.edges.some((e) => {
          // folded face penerating any edges?
          if (face.isPenetratingCrease(e)){
            return true;
          }
        });
      });
      // Whether other faces penetrate creases of this face
      isPenetrating = isPenetrating || origami.faces.some((f) => {
        return f.id !== face.id && face.edges.some((e) => {
          if (f.isPenetratingCrease(e)){
            return true;
          }
        });
      })
    });
    if (isPenetrating){
      // console.log('Penetrating');
      return Fold.RESULT_PENETRATING_CREASE;
    }

    return Fold.RESULT_SUCCESSFUL;
  }

  // Fold face based on folding edge and direction.
  // Direction is number indicating the desired layer of the face.
  // +N means fold up N layer. -N means fold down N layer. 0 is not valid.
  // Fold is valid if it is collinear with one of the edges of the face
  // Its length does not matter
  singleFold(origami, faceID, crease, direction){
    let face = origami.getFaceByID(faceID);
    if (!face) {
      // console.log('Invalid face ID');
      return Fold.RESULT_INVALID_FACEID;
    }

    let indexList = face.edgeIndexList(crease,true,null,true);
    if (indexList.length === 0){
      // console.log('Invalid fold edge');
      return Fold.RESULT_INVALID_FOLD_CREASE;
    }

    let desiredLayer = face.layer+direction;
    if (direction === 0 || desiredLayer < -1 || desiredLayer > origami.maxLayer+1) {
      // console.log('Invalid fold direction');
      return Fold.RESULT_INVALID_FOLD_DIRECTION;
    }

    // Save old face layers
    let oldFacesLayer = {};
    let oldLayers = origami.layers.slice(); // Copy
    for (let i = 0; i < origami.faces.length; i ++){
      oldFacesLayer[origami.faces[i].id] = origami.faces[i].layer;
    }

    // Fold the face and move to desired layer first
    face.mirror(crease);
    face.layer = desiredLayer;

    let isOverlapped = false;
    let isPenetrating = false;

    // NOTE: When a face is folded twice with same directions,
    // the face will move to another layer.

    // NOTE: two faces folded around the same crease can flip the paper

    // Check overlap
    if (desiredLayer >= 0 && desiredLayer <= origami.maxLayer){
      // Check whether folded face is overlapping other face
      let facesSameLayer = origami.getFacesByLayer(face.layer);
      isOverlapped = facesSameLayer.some((faceSameLayer) =>{
        return faceSameLayer.id !== face.id && faceSameLayer.overlapFace(face);
      });

      if (isOverlapped){
        if (direction <= 0){
          face.layer += 1;
        }
        // Move all above old faces up
        origami.faces.forEach((f) => {
          if(f.id !== face.id && f.layer >= face.layer) f.layer += 1;
        });
      } else {
        // Do nothing, face should just fit in the layer
      }
    } else if(desiredLayer === -1) {
      // Bottom layer, definitely no overlap, move all faces up
      origami.faces.forEach((f) => {
        f.layer += 1;
      });
    } else if (desiredLayer === origami.maxLayer+1){
      // Do nothing, face should just fit in the layer
    } else{
      // Should not reach here
      console.log('Invalid fold direction');
    }

    origami.sortFaces();
    origami.updateLayers();
    return Fold.RESULT_SUCCESSFUL;
  }
}
