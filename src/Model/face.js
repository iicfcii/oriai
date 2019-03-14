// Face
import { Edge } from './edge';
import { Point } from './point';

export class Face {
  constructor(id) {
    // Edges have to be in order
    // 1st edge's p2 has to equal to 2nd edge's p1
    // Assume that there is no concave polygon in CP
    this.edges = [];
    this.layer = 0; // Layer of the face, change after fold
    this.id = null;
    if (id !== undefined) this.id = id;
    this.selected = false;
    this.isShown = true;
  }

  // Unique string key to identify the face
  // TODO: need to add depth to truly be unique
  get key(){
    let key = this.polygonFlat.map(String);
    key.push(this.layer.toString()); // Add depth
    return key.join('');
  }

  // Get the polygon points in an flat array
  get polygonFlat() {
    let points = [];
    // Add points to the array
    this.edges.forEach((edge) => {
      points.push(edge.p1.x);
      points.push(edge.p1.y);
    });

    return points;
  }

  // Return a flat list [x1, y1, x2, y2, x3, y3...] with the ratio and offset(x,y)
  scale(ratio, x, y) {
    let points = [];
    this.edges.forEach((edge) => {
      let edgeS = edge.scale(ratio, x, y);
      points.push(edgeS[0]);
      points.push(edgeS[1]);
    });

    return points;
  }

  // Use this to add edge to make sure edges are added in order
  addEdge(edge) {
    if (!edge.isValid()){
      console.log('Invalid edge');
      return false;
    }

    let length = this.edges.length;
    // If no edge, just add
    if (length === 0){
      this.edges.push(edge);
      return true;
    }
    // Has edge, do not add
    if (this.hasEdge(edge)){
      console.log("Already has edge");
      return false;
    }
    // Order not correct, do not add
    if (!this.edges[length-1].p2.isEqual(edge.p1)) {
      console.log("Order not correct");
      return false;
    }
    // Otherwise, add
    this.edges.push(edge);
    return true;
  }

  hasEdge(edge1) {
    let has = false;
    this.edges.forEach((edge2) => {
      if (edge1.isEqual(edge2, true)){
        has = true;
      }
    });

    return has;
  }

  edgeIndex(edge) {
    for (let i = 0; i < this.edges.length; i ++){
      if (this.edges[i].isEqual(edge, true)) return i; // Ignore ordered for now
    }

    return -1;
  }

  // True if two faces overlapped each other
  // Same layer overlap: some common area, contain
  overlapFace(face){
    if (this.layer !== face.layer) return false;
    // if (this.layer !== face.layer){
    //   for (let i = 0; i < this.edges.length; i ++){
    //     for (let j = 0; j < face.edges.length; j ++){
    //       if (!face.edges[j].isBoundary){
    //         if (this.edges[i].intersectEdge(face.edges[j])){
    //           return true;
    //         }
    //       }
    //     }
    //   }
    //   for (let i = 0; i < this.edges.length; i ++){
    //     for (let j = 0; j < face.edges.length; j ++){
    //       if (!this.edges[i].isBoundary){
    //         if (face.edges[j].intersectEdge(this.edges[i])){
    //           return true;
    //         }
    //       }
    //     }
    //   }
    //
    //   return false;
    // }

    // If there is an intersection between two edges of the faces, overlap
    for (let i = 0; i < this.edges.length; i ++){
      for (let j = 0; j < face.edges.length; j ++){
        if (this.edges[i].intersectEdge(face.edges[j]) !== null) return true;
      }
    }

    // No intersection, can be one contains another
    // If one vertex is in another face, overlap.
    for (let i = 0; i < this.edges.length; i ++){
      if (this.edges[i].p1.isInFace(face)) return true;
    }
    for (let i = 0; i < face.edges.length; i ++){
      if (face.edges[i].p1.isInFace(this)) return true;
    }

    // No intersection and no vertex in another face
    // If vertexes of one are ALL on edges of other, overlap
    let areOnOtherFaceEdges = true;
    for (let i = 0; i < this.edges.length; i ++){
      let isOnEdge = false; // On any of the other face edge?
      for (let j = 0; j < face.edges.length; j ++){
        if (face.edges[j].hasPoint(this.edges[i].p1)) isOnEdge = true;
      }
      if (!isOnEdge){
         areOnOtherFaceEdges = false;
         break;
      }
    }
    let areOnThisFaceEdges = true;
    for (let i = 0; i < face.edges.length; i ++){
      let isOnEdge = false; // On any of the other face edge?
      for (let j = 0; j < this.edges.length; j ++){
        if (this.edges[j].hasPoint(face.edges[i].p1)) isOnEdge = true;
      }
      if (!isOnEdge){
         areOnThisFaceEdges = false;
         break;
      }
    }

    if (areOnOtherFaceEdges || areOnThisFaceEdges) return true;

    // No overlap
    return false;
  }

}
