import { Edge } from './Edge';
import { Point } from './Point';

export class Face {
  constructor(id) {
    // Edges have to be in order
    // 1st edge's p2 has to equal to 2nd edge's p1
    // NOTE: Assume all faces are convex
    this.edges = [];
    this.layer = 0; // Layer of the face, change after fold
    this.id = null;
    if (id !== undefined) this.id = id;
  }

  // Unique string key to identify the face
  // TODO: need to add depth to truly be unique
  get key(){
    // let key = this.polygonFlat.map(String);
    // key.push(this.layer.toString()); // Add depth
    // return key.join('');
    return 'face' + this.id;
  }

  // Get the polygon points in an flat array
  // get polygonFlat(){
  //   let points = [];
  //   // Add points to the array
  //   this.edges.forEach((edge) => {
  //     points.push(edge.p1.x);
  //     points.push(edge.p1.y);
  //   });
  //
  //   return points;
  // }

  get centroid(){
    let xSum = 0;
    let ySum = 0;
    let n = this.edges.length;

    this.edges.forEach((edge) => {
      xSum = xSum + edge.p1.x;
      ySum = ySum + edge.p2.y;
    });

    return new Point(xSum/n, ySum/n);
  }

  // Return a flat list [x1, y1, x2, y2, x3, y3...] with the ratio and offset(x,y)
  scale(layout) {
    let points = [];
    this.edges.forEach((edge) => {
      let edgeS = edge.scale(layout);
      points.push(edgeS[0]);
      points.push(edgeS[1]);
    });

    return points;
  }

  // Use this to add edge to make sure edges are added in order
  addEdge(edge) {
    if (!edge.isValid()){
      // console.log('Invalid edge');
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

  hasEdge(edge, ignoreOrder) {
    let list = this.edgeIndexList(edge,false,ignoreOrder);
    return list.length > 0;
  }

  // Get the index of an edge
  // Can have more than one index
  // Always return an array
  // ignoreOrder only works when infiniteLength is false
  edgeIndexList(edge, infiniteLength, ignoreOrder, includeOutside) {
    let list = [];
    for (let i = 0; i < this.edges.length; i ++){
      if (infiniteLength){
        if (this.edges[i].hasPoint(edge.p1,includeOutside) &&
            this.edges[i].hasPoint(edge.p2,includeOutside)){
          list.push(i);
        };
      } else {
        if (this.edges[i].isEqual(edge, ignoreOrder)){
          list.push(i);
        };
      }
    }

    return list;
  }

  mirror(edge) {
    this.edges.forEach((e) => {
      e.mirror(edge);
    });
  }

  // Return false if not a crease
  isPenetratingCrease(crease){
    if (!crease.isCrease) return false;

    // if not within range, no penetration possible
    if (this.layer <= crease.bottomLayer || this.layer >= crease.topLayer) return false;

    // Use edge index list to make sure crease that is collinear with one of the
    // face edges won't be considered inside face.
    if (!crease.p1.isOutsideFace(this) &&
        !crease.p2.isOutsideFace(this) &&
        this.edgeIndexList(crease, true, null, true).length === 0){
      // Crease not outside face
      console.log('Crease not outside face');
      return true;
    }

    for (let i = 0; i < this.edges.length; i ++){
      if (this.edges[i].intersectEdge(crease, false) !== null){
        // Face intersects with a crease
        console.log('Face intersects with a crease');
        return true;
      }
    }

    let list = this.edgeIndexList(crease, true, null, false);
    if (list.length > 0){
      if (crease.parentFace1.overlapFace(this, true) || crease.parentFace2.overlapFace(this, true)){
        return list.some((index) => {
          if (!this.edges[index].isCrease) return false
          if (this.edges[index].parentFace2.layer > crease.topLayer ||
              this.edges[index].parentFace2.layer < crease.bottomLayer){
            console.log('Crease crosses crease of face');
            return true;
          }
        });
      }
    }

    return false;
  }

  // True if two faces overlapped each other
  // Same layer overlap: some common area, contain
  overlapFace(face, ignoreLayer){
    if (this.layer !== face.layer && !ignoreLayer) return false;

    // If there is an intersection between two edges of the faces, overlap
    for (let i = 0; i < this.edges.length; i ++){
      for (let j = 0; j < face.edges.length; j ++){
        if (this.edges[i].intersectEdge(face.edges[j]) !== null){
          return true;
        }
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

  // Face intersets an edge
  // Return an edge if exists or null
  intersectEdge(edge, infiniteLength){
    // Simple checking first
    let edge1Index = null;
    let edge2Index = null;

    // Find edge.p1 then edge.p2
    for (let i = 0; i < this.edges.length; i ++){
      // At the same time, check if one edge has both points
      let hasP1 = this.edges[i].hasPoint(edge.p1);
      let hasP2 = this.edges[i].hasPoint(edge.p2);
      if (hasP1 && hasP2) return null;

      if (hasP1) edge1Index = i;
    }

    for (let i = 0; i < this.edges.length; i ++){
      if (this.edges[i].hasPoint(edge.p2)) edge2Index = i;
    }

    if (edge1Index !== null && edge2Index !== null){
      // console.log(edge1Index, edge2Index);
      // Make sure the order is correct
      // if (edge1Index < edge2Index) return new Edge(edge.p1, edge.p2);
      // return new Edge(edge.p2, edge.p1);
      return edge;
    }

    if (!infiniteLength && (edge1Index === null || edge2Index === null)) return null;

    // Has to do more complicated checking
    // Find two intersection points first
    let p1 = null;
    let p2 = null;
    edge1Index = null;
    edge2Index = null;
    for (let i = 0; i < this.edges.length; i ++){
      let pTmp = this.edges[i].intersectEdge(edge, true);
      if (pTmp === null) continue;
      if (pTmp.isOutsideFace(this)) continue;

      p1 = pTmp;
      edge1Index = i;
    }

    for (let i = 0; i < this.edges.length; i ++){
      if (i === edge1Index) continue;

      let pTmp = this.edges[i].intersectEdge(edge, true);
      if (pTmp === null ||
          pTmp.isOutsideFace(this) ||
          pTmp.isEqual(p1)) continue;
      p2 = pTmp;
      edge2Index = i;
    }

    if (edge1Index !== null && edge2Index !== null) {
      let newEdge = new Edge(p1, p2);
      // Even if infinite length
      // collinear edge does not count as intersected
      if(this.hasEdge(newEdge, true)) return null;

      return newEdge;
    }

    return null;
  }

}
