export class Fold {
  constructor(faceIDs, crease, directions){
    this.faceIDs = faceIDs;
    this.crease = crease;
    this.directions = directions;
  }

  do(origami){
    let isSuccessful = this.faceIDs.every((faceID, index) => {
      return this.singleFold(origami, faceID, this.crease, this.directions[index]);
    });
    //  Check crease connection
    return isSuccessful;
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

    let indexList = face.edgeIndexList(crease,true);
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
    // Layer directly below/above is empty but not all layers below/above are empty
    if (direction > 0){
      let layerBelowEmpty = false;
      let allLayersBelowEmpty = true;
      origami.layers.forEach((layer) => {
        if (layer === face.layer - 1){
          let faces = origami.getFacesByLayer(layer);
          if (faces.length === 0) layerBelowEmpty = true;
        }
        if (layer < face.layer - 1){
          let faces = origami.getFacesByLayer(layer);
          if (faces.length !== 0) allLayersBelowEmpty = false;
        }
      });
      if (layerBelowEmpty && !allLayersBelowEmpty) isFloating = true;
    } else {
      let layerAboveEmpty = false;
      let allLayersAboveEmpty = true;
      origami.layers.forEach((layer) => {
        if (layer === face.layer + 1){
          let faces = origami.getFacesByLayer(layer);
          if (faces.length === 0) layerAboveEmpty = true;
        }
        if (layer > face.layer + 1){
          let faces = origami.getFacesByLayer(layer);
          if (faces.length !== 0) allLayersAboveEmpty = false;
        }
      });
      if (layerAboveEmpty && !allLayersAboveEmpty) isFloating = true;
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
        return faceSameLayer.overlapFace(face) && faceSameLayer.id !== face.id;
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

    // Check penetration
    isPenetrating = origami.faces.some((f) => {
      return f.edges.some((e) => {
        // folded face penerating any edges?
        if (face.isPenetratingCrease(e)){
          console.log('Penerating');
          return true;
        }
      }) && f.id !== face.id;
    });

    if (isPenetrating){
      // Undo mirror
      face.mirror(crease);
      // Undo layer change
      origami.faces.forEach((f) =>{f.layer = oldFacesLayer[f.id]});
      // Undo layers
      origami.layers = oldLayers
      return false;
    }

    origami.sortFaces();
    origami.updateLayers();
    return true;
  }
}
