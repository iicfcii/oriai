export class Fold {
  constructor(faceIDs, creases, directions){
    this.faceIDs = faceIDs;
    this.creases = creases;
    this.directions = directions;
  }

  do(origami){
    let isFoldFailed = this.faceIDs.some((faceID, index) => {
      return this.singleFold(origami, faceID, this.creases[index], this.directions[index]) === false;
    });
    if (isFoldFailed) return false;

    // Crease twin cannot be found
    let missingTwin = this.faceIDs.some((faceID) => {
      return origami.getFaceByID(faceID).edges.some((edge) => {
        if (!edge.isCrease) return false;
        return edge.twin === null;
      });
    });
    // console.log('missingTwin', missingTwin);
    if (missingTwin){
      console.log('Missing twin');
      return false;
    };

    // Check penetration
    let isPenetrating = false;
    this.faceIDs.forEach((faceID,index) => {
      let face = origami.getFaceByID(faceID);
      let crease = this.creases[index];
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
      console.log('Penetrating');
      return false;
    }

    return true;
  }

  // Fold face based on folding edge and direction.
  // Direction is number indicating the desired layer of the face.
  // +N means fold up N layer. -N means fold down N layer. 0 is not valid.
  // Fold is valid if it is collinear with one of the edges of the face
  // Its length does not matter
  singleFold(origami, faceID, crease, direction){
    let face = origami.getFaceByID(faceID);
    if (!face) {
      console.log('Invalid face ID');
      return false;
    }

    let indexList = face.edgeIndexList(crease,true,null,true);
    if (indexList.length === 0){
      console.log('Invalid fold edge');
      return false;
    }

    let desiredLayer = face.layer+direction;
    if (direction === 0 || desiredLayer < -1 || desiredLayer > origami.maxLayer+1) {
      console.log('Invalid fold direction');
      return false;
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
    let isFloating = false

    // Check floating
    // Layer directly below/above has no overlapped faces
    if (direction > 0){
      let hasFacesBelow = false;
      let hasFacesBelowBelow = false;
      if (face.layer > 0){
        let faceCount = 0;
        origami.faces.forEach((f) => {
          if (f.layer === face.layer - 1){
            if (f.overlapFace(face, true)){
              hasFacesBelow = true;
            }
          }

          if (f.layer < face.layer - 1){
            faceCount = faceCount + 1;
          }
        });
        // No faces below, cannot be floating
        if (faceCount === 0) hasFacesBelowBelow = true;
      } else {
        // Bottom layer, no faces below
        hasFacesBelow = true;
      }
      if (!hasFacesBelow && !hasFacesBelowBelow) isFloating = true;
    } else {
      let hasFacesAbove = false;
      let hasFacesAboveAbove = false;
      if (face.layer < origami.maxLayer){
        let faceCount = 0;
        origami.faces.forEach((f) => {
          if (f.layer === face.layer + 1){
            if (f.overlapFace(face, true)){
              hasFacesAbove = true;
            }
          }

          if (f.layer > face.layer + 1){
            faceCount = faceCount + 1;
          }
        });
        // No faces above, cannot be floating
        if (faceCount === 0) hasFacesAboveAbove = true;
      } else {
        // Top layer, no faces above
        hasFacesAbove = true;
      }
      if (!hasFacesAbove && !hasFacesAboveAbove) isFloating = true;
    }

    if (isFloating){
      console.log('Floating face');
      // Undo mirror
      face.mirror(crease);
      // Undo layer change
      for (let i = 0; i < origami.faces.length; i ++){
        origami.faces[i].layer = oldFacesLayer[origami.faces[i].id];
      }
      // Undo layers
      origami.layers = oldLayers
      return false;
    }


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
    return true;
  }
}
