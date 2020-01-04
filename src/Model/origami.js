// Origami
// Top level object that holds an entire origami
// An origami is modeled as lots of faces.
// Each face contains some edges.
// Same edge may belong to several faces

// Attributes:
// Faces

// Methods:
// Crease
// Fold

import { Face } from './face';
import { Edge } from './edge';
import { Point } from './point';

export class Origami {

  // Has a single 1*1 face initially
  constructor(){
    this.faces = [];
    this.layers = [0];

    // Add the initial face
    let face = new Face(1); // Starting id is 1
    face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
    face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
    face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
    face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));
    this.faces.push(face);
  }

  updateLayers() {
    // Remove empty layers
    let emptyLayers  = [];
    this.layers.forEach((layer) => {
      let faces = this.getFacesByLayer(layer);
      if (faces.length === 0) emptyLayers.push(layer);
    });

    // Reduce layer for affected faces
    emptyLayers.forEach((emptyLayer) => {
      const index = this.layers.indexOf(emptyLayer);
      if (index > -1) this.layers.splice(index, 1);

      this.faces.forEach((face) => {
        if (face.layer > emptyLayer){
          face.layer = face.layer - 1;
        }
      });
    });

    // Add new Layers
    this.layers = [];
    this.faces.forEach((face) => {
      if (!this.layers.includes(face.layer)){
        this.layers.push(face.layer);
      }
    });

  }

  get maxLayer() {
    return Math.max(...this.layers);
  }

  get minLayer() {
    return Math.min(...this.layers);
  }

  getFaceByID(id){
    for (let i = 0; i < this.faces.length; i ++){
      if (this.faces[i].id === id){
        return this.faces[i];
      }
    }
  }

  getFacesByLayer(layer){
    let faces = [];
    for (let i = 0; i < this.faces.length; i ++){
      if (this.faces[i].layer === layer){
        faces.push(this.faces[i]);
      }
    }
    return faces;
  }

  showLayers(layers){
    this.changeAllLayerVisibility(false)
    layers.forEach((l) =>{
      this.changeLayerVisibility(l,true);
    } );
  }

  changeLayerVisibility(layer, shouldShow){
    this.faces.forEach((face) => {
      if (face.layer === layer) face.isShown = shouldShow;
    });
  }

  changeAllLayerVisibility(shouldShow){
    this.faces.forEach((face) => {
      face.isShown = shouldShow;
    });
  }

  sortFaces(){
    this.faces.sort((face1, face2) => {
      if (face1.layer <= face2.layer){
        return -1;
      } else {
        return 1;
      }
    });
  }

  // face: face of a origami to be creased, will be removed after new ones are generated
  // edge: proposed creasing line, infinite length
  singleCrease(faceID, creaseEdge){
    let face = this.getFaceByID(faceID);
    let edge = face.intersectEdge(creaseEdge, true);
    if (edge === null) {
      console.log('Crease Failed');
      return;
    }

    // Assumed order
    let p1 = edge.p1;
    let p2 = edge.p2;
    let edge1Index = null;
    let edge2Index = null;
    let id = face.id; // Original id

    // Find the index of the two edges that the crease end points are on
    for (let i = 0; i < face.edges.length; i ++){
      if (face.edges[i].hasPoint(p1)){
        edge1Index = i;
      }
      if (face.edges[i].hasPoint(p2)){
        edge2Index = i;
      }
    }

    if (edge1Index === null || edge2Index === null){
      console.log('Crease Failed');
      return;
    }

    if (edge1Index > edge2Index){
      // Order not correct, flip
      p1 = edge.p2;
      p2 = edge.p1;
      let edgeTmpIndex = edge1Index; // Temp variable to save the index
      edge1Index = edge2Index;
      edge2Index = edgeTmpIndex;
    }

    // Helper function
    let addFixedEdge = (faceTmp, edgeTmp) => {
      // If invalid, don't add.
      if (!edgeTmp.isValid()) return;

      if (edgeTmp.isBoundary){
        // If just a boundary fix parent and add
        edgeTmp.parentFace1 = faceTmp;
        faceTmp.addEdge(edgeTmp);
      }
      if (edgeTmp.isCrease){
        // console.log('Crease', edgeTmp);
        // Fix the same crease on other face if exists
        let f = edgeTmp.parentFace2;
        let indexList = f.edgeIndexList(edgeTmp, true); // Use infinite length
        if (indexList.length > 0) {
          let index = indexList[0]; // Default to first match
          if (indexList.length > 1){
            // If more than one edge, should be able to find an exact one
            let hasExactMatch = false;
            for (let j = 0; j < indexList.length; j ++){
              if (f.edges[indexList[j]].isEqual(edgeTmp, true)){
                index = indexList[j];
                hasExactMatch = true;
              }
            }
            if (!hasExactMatch){
              console.log('Not sure which match to use');
            }
          }
          if (f.hasEdge(edgeTmp, true)){
            // Edge already exists on other face, not broken
            f.edges[index].parentFace2 = faceTmp;
          } else {
            // Create new edges for the other face
            let face = new Face(f.id);

            let k = 0;
            while (k < index){
              face.addEdge(f.edges[k]);
              k += 1;
            }

            let p; // The point not end point
            if (f.edges[k].isPointP1(edgeTmp.p1) || f.edges[k].isPointP2(edgeTmp.p1)){
              p = edgeTmp.p2.copy;
            } else {
              p = edgeTmp.p1.copy;
            }
            face.addEdge(new Edge(f.edges[k].p1.copy,p,f.edges[k].parentFace1,faceTmp));
            face.addEdge(new Edge(p,f.edges[k].p2.copy,f.edges[k].parentFace1,faceTmp));
            k += 1;
            while (k < f.edges.length){
              face.addEdge(f.edges[k]);
              k += 1;
            }

            f.edges = face.edges;
          }
          // parentFace1 will always be the one that need fix
          // A face's crease will always has itself as the first parent
          edgeTmp.parentFace1 = faceTmp;
          faceTmp.addEdge(edgeTmp);
        }
      }
    }

    // Make face 1
    let face1 = new Face(id); // face 1 use original id
    face1.layer = face.layer;
    let i = 0;
    while(i < edge1Index){
      addFixedEdge(face1, face.edges[i]);
      i ++;
    }
    // Add p1 to x1y1 edge
    addFixedEdge(face1, new Edge(face.edges[i].p1.copy,p1.copy,face.edges[i].parentFace1,face.edges[i].parentFace2));
    i ++;
    // Add x1y1 to x2y2 edge
    let newCrease1 = new Edge(p1.copy,p2.copy,face1); // Should fix the parent later in this function
    face1.addEdge(newCrease1);
    i = edge2Index;
    addFixedEdge(face1, new Edge(p2.copy,face.edges[i].p2.copy,face.edges[i].parentFace1,face.edges[i].parentFace2));
    i ++;
    while(i<face.edges.length){
      addFixedEdge(face1, face.edges[i]);
      i ++;
    }
    // Make face 2
    let face2 = new Face(this.faces.length+1); // face 2 increment id
    face2.layer = face.layer;
    i = edge1Index;
    // Add x1y1 to p2 edge
    addFixedEdge(face2, new Edge(p1.copy,face.edges[i].p2.copy,face.edges[i].parentFace1,face.edges[i].parentFace2));
    i ++;
    while(i !== edge2Index){
      // Add edge until edge2 is found
      addFixedEdge(face2, face.edges[i]);
      i ++;
    }
    // Add p1 to x2y2 edge
    addFixedEdge(face2, new Edge(face.edges[i].p1.copy,p2.copy,face.edges[i].parentFace1,face.edges[i].parentFace2));
    i ++;
    // Add x2y2 to x1y1 edge
    newCrease1.parentFace2 = face2; // Fix previous one here
    let newCrease2 = new Edge(p2.copy,p1.copy,face2,face1);
    face2.addEdge(newCrease2);

    // console.log(face1);
    // console.log(face2);

    this.faces.splice(this.faces.indexOf(face), 1, face1); // Replace original face
    // this.faces.push(face1);
    this.faces.push(face2);

    this.sortFaces();
  }

  // Fold face based on folding edge and direction.
  // Direction is number indicating the desired layer of the face.
  // +N means fold up N layer. -N means fold down N layer. 0 is not valid.
  // Fold is valid if it is collinear with one of the edges of the face
  // Its length does not matter
  singleFold(faceID, foldEdge, dir){
    let face = this.getFaceByID(faceID);
    if (!face) {
      console.log('Invalid face ID');
      return false;
    }

    let indexList = face.edgeIndexList(foldEdge,true);
    if (indexList.length === 0){
      console.log('Invalid fold edge');
      return false;
    }

    let desiredLayer = face.layer+dir;
    if (dir === 0 || desiredLayer < -1 || desiredLayer > this.maxLayer+1) {
      console.log('Invalid fold direction');
      return false;
    }

    // Save old face layers
    let oldFacesLayer = {};
    let oldLayers = this.layers.slice(); // Copy
    for (let i = 0; i < this.faces.length; i ++){
      oldFacesLayer[this.faces[i].id] = this.faces[i].layer;
    }

    // Fold the face and move to desired layer first
    face.mirror(foldEdge);
    face.layer = desiredLayer;

    let isOverlapped = false;
    let isPenetrating = false;
    let isFloating = false

    // Check floating
    // Layer directly below/above is empty but not all layers below/above are empty
    if (dir > 0){
      let layerBelowEmpty = false;
      let allLayersBelowEmpty = true;
      this.layers.forEach((layer) => {
        if (layer === face.layer - 1){
          let faces = this.getFacesByLayer(layer);
          if (faces.length === 0) layerBelowEmpty = true;
        }
        if (layer < face.layer - 1){
          let faces = this.getFacesByLayer(layer);
          if (faces.length !== 0) allLayersBelowEmpty = false;
        }
      });
      if (layerBelowEmpty && !allLayersBelowEmpty) isFloating = true;
    } else {
      let layerAboveEmpty = false;
      let allLayersAboveEmpty = true;
      this.layers.forEach((layer) => {
        if (layer === face.layer + 1){
          let faces = this.getFacesByLayer(layer);
          if (faces.length === 0) layerAboveEmpty = true;
        }
        if (layer > face.layer + 1){
          let faces = this.getFacesByLayer(layer);
          if (faces.length !== 0) allLayersAboveEmpty = false;
        }
      });
      if (layerAboveEmpty && !allLayersAboveEmpty) isFloating = true;
    }

    if (isFloating){
      console.log('Floating face');
      // Undo mirror
      face.mirror(foldEdge);
      // Undo layer change
      for (let i = 0; i < this.faces.length; i ++){
        this.faces[i].layer = oldFacesLayer[this.faces[i].id];
      }
      // Undo layers
      this.layers = oldLayers
      return false;
    }


    // Check overlap
    if (desiredLayer >= 0 && desiredLayer <= this.maxLayer){
      // Check whether folded face is overlapping other face
      let facesSameLayer = this.getFacesByLayer(face.layer);
      isOverlapped = facesSameLayer.some((faceSameLayer) =>{
        return faceSameLayer.overlapFace(face) && faceSameLayer.id !== face.id;
      });

      if (isOverlapped){
        if (dir <= 0){
          face.layer += 1;
        }
        // Move all above old faces up
        this.faces.forEach((f) => {
          if(f.id !== face.id && f.layer >= face.layer) f.layer += 1;
        });
      } else {
        // Do nothing, face should just fit in the layer
      }
    } else if(desiredLayer === -1) {
      // Bottom layer, definitely no overlap, move all faces up
      this.faces.forEach((f) => {
        f.layer += 1;
      });
    } else if (desiredLayer === this.maxLayer+1){
      // Do nothing, face should just fit in the layer
    } else{
      // Should not reach here
      console.log('Invalid fold direction');
    }

    // Check penetration
    isPenetrating = this.faces.some((f) => {
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
      face.mirror(foldEdge);
      // Undo layer change
      this.faces.forEach((f) =>{f.layer = oldFacesLayer[f.id]});
      // Undo layers
      this.layers = oldLayers
      return false;
    }

    this.sortFaces();
    this.updateLayers();
    return true;
  }

  // Make multiple creases through different layers of faces
  // Edge: single fold line,
  multiCrease(edge){
    let currentLength = this.faces.length;

    // Since creasing will replace the original face and append a new face.
    // Only the original faces should be creased
    for (let i = 0; i < currentLength; i ++){
      this.singleCrease(i+1, edge);
    }
  }
}
