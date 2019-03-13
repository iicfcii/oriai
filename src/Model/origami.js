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

    // Add the initial face
    let face = new Face(1); // Starting id is 1
    face.addEdge(new Edge(new Point(0,0),new Point(0,1)));
    face.addEdge(new Edge(new Point(0,1),new Point(1,1)));
    face.addEdge(new Edge(new Point(1,1),new Point(1,0)));
    face.addEdge(new Edge(new Point(1,0),new Point(0,0)));
    this.faces.push(face);
  }

  get layers(){
    let layers = [];
    for (let i = 0; i < this.faces.length; i ++){
      let l = this.faces[i].layer;
      if (!layers.includes(l)){
        layers.push(l);
      }
    }

    return layers; // May need to sort it
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

  // Crease single face
  // to create more faces
  // Two endpoints of crease line has to lay on edge
  crease(face, edge) {
    let p1 = edge.p1;
    let p2 = edge.p2;

    // Find the two edges endpoints on
    let edge1, edge2;
    face.edges.forEach((edge) => {
      if (edge.hasPoint(p1)){
        edge1 = edge;
      }
      if (edge.hasPoint(p2)){
        edge2 = edge;
      }
    });
    // console.log(edge1);
    // console.log(edge2);

    if (!edge1 || !edge2){
      console.log('Crease Failed');
      // Directly copy the face if crease does not apply to currect face
      // newFaces.push(face);
      return false;
    }

    // Helper function to make new faces
    let makeFace = (edge1, edge2, p1, p2) => {
      // Make face 1
      let face1 = new Face(face.id); // face 1 use original id
      let i = 0;

      while(face.edges[i] !== edge1){
        // Add edge until edge1 is found
        face1.addEdge(face.edges[i]);
        i ++;
      }

      // Add p1 to x1y1 edge
      face1.addEdge(new Edge(new Point(face.edges[i].p1.x,face.edges[i].p1.y),p1));  // Zero length edge won't be added
      i ++;
      // Add x1y1 to x2y2 edge
      face1.addEdge(new Edge(p1,p2, false));

      while(face.edges[i] !== edge2){
        // Do nothing untile edge2 is found
        i ++;
      }

      face1.addEdge(new Edge(p2,new Point(face.edges[i].p2.x,face.edges[i].p2.y)));
      i ++;
      while(i<face.edges.length){
        face1.addEdge(face.edges[i]);
        i ++;
      }

      // Make face 2
      let face2 = new Face(this.faces.length+1); // face 2 increment id
      i = 0;

      while(face.edges[i] !== edge1){
        // Do nothing untile edge1 is found
        i ++;
      }

      // Add x1y1 to p2 edge
      face2.addEdge(new Edge(p1,new Point(face.edges[i].p2.x,face.edges[i].p2.y)));
      i ++;

      while(face.edges[i] !== edge2){
        // Add edge untile edge2 is found
        face2.addEdge(face.edges[i]);
        i ++;
      }

      // Add p1 to x2y2 edge
      face2.addEdge(new Edge(new Point(face.edges[i].p1.x,face.edges[i].p1.y),p2));
      i ++;
      // Add x2y2 to x1y1 edge
      face2.addEdge(new Edge(p2,p1,false));

      while(i<face.edges.length){
        face2.addEdge(face.edges[i]);
        i ++;
      }
      // console.log('Face1');
      // console.log(face1.edges);
      // console.log('Face2');
      // console.log(face2.edges);

      this.faces.splice(this.faces.indexOf(face), 1); // Remove original face
      this.faces.push(face1);
      this.faces.push(face2);
    }

    // Make faces
    if (face.edges.indexOf(edge1) < face.edges.indexOf(edge2)){
      // Will encounter edge 1 first
      makeFace(edge1, edge2, p1, p2);
    } else {
      // Will encounter edge 2 first
      // Swap edge 1 and edge 2, Swap x1y1 and x2y2
      makeFace(edge2, edge1, p2, p1);
    }

    // this.faces = newFaces;
    // console.log(this.faces);
    return true;
  }

  // Fold single face along a crease
  // Line has to be one of the edge
  // dir: valley/mountain stirng, affect layer +/-1
  fold(face, edge, dir){
    if (dir !== 'valley' && dir !== 'mountain'){
      console.log('Invalid fold direction');
      return false;
    }

    let creaseIndex = face.edgeIndex(edge);

    if (creaseIndex === -1){
      console.log('Invalid crease');
      return false;
    }

    // console.log('Valid crease');

    // Simply reflect points for remaining edges
    // Order should be correct even after reflect
    for (let i = creaseIndex; i < face.edges.length; i ++){
      face.edges[creaseIndex].reflectEdge(face.edges[i]);
    }

    for (let i = 0; i < creaseIndex; i ++){
      face.edges[creaseIndex].reflectEdge(face.edges[i]);
    }

    if (dir === 'valley') {
      face.layer += 1;
    } else {
      face.layer -= 1;
    }
    // console.log(this.faces);
  }
}
