// Face
import { Edge } from './edge';

export class Face {
  constructor() {
    // Edges have to be in order
    // 1st edge's p2 has to equal to 2nd edge's p1
    // Assume that there is no concave polygon in CP
    this.edges = [];
  }

  // Use this to add edge to make sure edges are added in order
  addEdge(edge) {
    if (!edge.isValid()){
      console.log("Invalid");
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
      return false;
    }
    // Order not correct, do not add
    if (this.edges[length-1].x2 !== edge.x1 || this.edges[length-1].y2 !== edge.y1) {
      return false;
    }
    // Otherwise, add
    this.edges.push(edge);
    return true;
  }

  hasEdge(edge1) {
    let has = false;
    this.edges.forEach((edge2) => {
      if (edge1.isEqual(edge2)){
        has = true;
      }
    });

    return has;
  }

  // Unique string key to identify the face
  // TODO: need to add depth to truly be unique
  get key(){
    let key = this.polygon.map(String);
    key.push('0'); // Add depth
    return key.join('');
  }

  // Get the polygon vertices in an array
  get polygon() {
    let points = [];
    // Add points to the array
    this.edges.forEach((edge) => {
      points.push(edge.x1);
      points.push(edge.y1);
    });

    return points;
  }
}
