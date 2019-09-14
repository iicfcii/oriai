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
    this.layers = [];

    // Add the initial face
    let face = new Face(1); // Starting id is 1
    face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
    face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
    face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
    face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));
    this.faces.push(face);
    this.addLayer(face.layer);
  }

  addLayer(l) {
    if (!this.layers.includes(l)){
      this.layers.push(l);
    }

    // May need to sort it
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


  // Return a list of broken creases for next crease to figure out the new parents
  // face: face of a origami to be creased, will be removed after new ones are generated
  // edge: proposed creasing line, infinite length
  // creases: list of broken creases to be fixed
  singleCrease(face, edge){
    edge = face.intersectEdge(edge, true);
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
        let index = f.edgeIndex(edgeTmp, true); // Use infinite length
        if (index !== -1) {
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
            face.addEdge(new Edge(p,f.edges[k].p2.copy,f.edges[k].parentFace1,f.edges[k].parentFace2));
            k += 1;
            while (k < f.edges.length){
              face.addEdge(f.edges[k]);
              k += 1;
            }

            // console.log(face.edges);
            f.edges = face.edges;
          }
          // parentFace1 will always be the one that need fix
          // A face's crease will always has itself as the first parent
          edgeTmp.parentFace1 = faceTmp;
          faceTmp.addEdge(edgeTmp);
        } else {
          // Will never be here if infiniteLength
          // A crease will always have two face paerents
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
  }

  // TODO: Fold face based on folding edge and direction.
  // Direction is number indicating the desired layer of the face.
  // +N means fold up N layer. -N means fold down N layer. 0 is not valid.
  // Check creases will make sure fold is valid
  singleFold(face, edge, dir){
    // Have to add some undo function

    let desiredLayer = face.layer+dir;
    if (dir === 0 || desiredLayer < -1 || desiredLayer > this.maxLayer+1) {
      console.log('Invalid fold direction');
      return false;
    }
    // Fold the face first.
    face.mirror(edge);
    // Check overlap at desired layer
    face.layer = desiredLayer;

    let isOverlapped = false;
    let isPenetrating = false;
    if (desiredLayer >= 0 || desiredLayer <= this.maxLayer){
      // Check whether folded face is overlapping other face
      for (let i = 0; i < this.faces.length; i ++){
        if (i === this.faces.indexOf(face)) continue; // Dont check itself
        if (this.faces[i].layer !== face.layer) continue;

        if (this.faces[i].overlapFace(face)){
           isOverlapped = true;
           break;
        }
      }
    }

    if (dir > 0){
      if(isOverlapped){
        // Move all above old faces up
        for (let i = 0; i < this.faces.length; i ++){
          if (i === this.faces.indexOf(face)) continue; // Dont check itself
          if (this.faces[i].layer >= face.layer) {
            this.faces[i].layer += 1;
            this.addLayer(this.faces[i].layer);
          }
        }
      } else {
        this.addLayer(face.layer);
      }
    } else {
      if(isOverlapped){
        // Move all above old faces including itself up
        for (let i = 0; i < this.faces.length; i ++){
          if (this.faces[i].layer >= face.layer) {
            this.faces[i].layer += 1;
            this.addLayer(this.faces[i].layer);
          }
        }
      } else {
        face.layer += 1;
        // Move all above old faces excluding itself up
        for (let i = 0; i < this.faces.length; i ++){
          if (i === this.faces.indexOf(face)) continue; // Dont check itself
          if (this.faces[i].layer >= face.layer) {
            this.faces[i].layer += 1;
            this.addLayer(this.faces[i].layer);
          }
        }
      }
    }

    // Check penetration

    // Check crease connection
  }


  // Fold single face along a crease
  // Line has to be one of the edge
  // dir: valley/mountain stirng, affect layer
  // will try to put the new face on the outer most layer
  _singleFold(face, edge, dir){
    if (dir !== 'valley' && dir !== 'mountain'){
      console.log('Invalid fold direction');
      return false;
    }

    let creaseIndex = face.edgeIndex(edge);

    if (creaseIndex === -1){
      console.log('Invalid crease');
      return false;
    }

    let currentLayer = face.layer;
    // Order should be correct even after reflect
    for (let i = 0; i < face.edges.length; i ++){
      face.edges[creaseIndex].reflectEdge(face.edges[i]);
    }

    let dLayer = 1;
    if (dir === 'mountain') dLayer = -1;
    face.layer += dLayer;
    // console.log(face.layer);

    let currentMaxLayer = this.maxLayer;
    let currentMinLayer = this.minLayer;

    while (face.layer <= currentMaxLayer+1 && face.layer >= currentMinLayer-1){
      let isOverlapped = false;
      let isPenetrating = false;

      // Check whether folded face is overlapping other face
      for (let i = 0; i < this.faces.length; i ++){
        if (i === this.faces.indexOf(face)) continue; // Dont check itself
        if (this.faces[i].layer !== face.layer) continue;

        if (this.faces[i].overlapFace(face)){
           isOverlapped = true;
           break;
        }
      }

      // Check whether other face is penetrating the crease of the folded face
      for (let i = 0; i < face.edges.length; i ++){
        for (let j = 0; j < this.faces.length; j ++){
          // console.log(face.edges[i]);
          if (!face.edges[i].isCrease) continue; // Not a crease, skip

          if (this.faces[j].isPenetratingCrease(face.edges[i])){
            isPenetrating = true;
            break;
          }
        }
      }

      if (isOverlapped || isPenetrating){
        console.log('Overlap', isOverlapped, 'Penetrating', isPenetrating);
        face.layer += dLayer;
        if (face.layer > currentMaxLayer+1 || face.layer < currentMinLayer-1){
          // Not a valid fold, undo every thing
          // Can also get a face copy and test first
          for (let i = 0; i < face.edges.length; i ++){
            face.edges[creaseIndex].reflectEdge(face.edges[i]);
          }
          face.layer = currentLayer;
          console.log('Invalid fold');
          return false;
        }
      } else {
        break;
      }
    }

    this.addLayer(face.layer);
  }

  // Make multiple creases through different layers of faces
  // Edge: single fold line,
  multiCrease(edge){
    let currentLength = this.faces.length;

    // Since creasing will replace the original face and append a new face.
    // Only the original faces should be creased
    for (let i = 0; i < currentLength; i ++){
      this.singleCrease(this.faces[i], edge);
    }

    console.log(this.faces)
  }
}
