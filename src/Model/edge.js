import { Point } from './point';

// Edge

export class Edge {
  constructor(p1, p2, face1, face2){
    // p1
    this.p1 = p1;
    // p2
    this.p2 = p2;

    this.parentFace1 = null;
    this.parentFace2 = null; // Can be null if not a crease

    if (face1) this.parentFace1 = face1;
    if (face2) this.parentFace2 = face2;

    this.selected = false;
  }

  get isBoundary() {
    if (this.parentFace1 !== null && this.parentFace2 === null) return true;

    return false;
  }

  get isCrease() {
    if (this.parentFace1 !== null && this.parentFace2 !== null) return true;

    return false;
  }

  get twin() {
    if (!this.isCrease) return null;

    for (let i = 0; i < this.parentFace2.edges.length; i++){
      if (this.parentFace2.edges[i].isEqual(this, true)){
        return this.parentFace2.edges[i];
      }
    }

    console.log('No twin found')
    return null;
  }

  get key(){
    let p = [this.p1.x,this.p1.y,this.p2.x,this.p2.y];
    let key = p.map(String);
    return key.join('');
  }

  // Return a flat list [x1, y1, x2, y2] with the ratio and offset(x,y)
  scale(ratio, x, y) {
    let p1 = this.p1.scale(ratio, x, y);
    let p2 = this.p2.scale(ratio, x, y);
    return p1.concat(p2);
  }

  isValid(){
      // Zero length edge
      if (this.isPointP1(this.p2)) return false;

      // Neither boundary nor creaes
      if (!this.isBoundary && !this.isCrease) return false;

      return true;
  }

  isEqual(edge, ignoreOrder){
    if (this.p1.isEqual(edge.p1) &&
        this.p2.isEqual(edge.p2)){
      return true;
    }

    if (ignoreOrder &&
        this.p1.isEqual(edge.p2) &&
        this.p2.isEqual(edge.p1)){
      return true;
    }

    return false;
  }

  isPointP1(p){
    return this.p1.isEqual(p);
  }

  isPointP2(p){
    return this.p2.isEqual(p);
  }

  // Will include both end points
  hasPoint(p, infiniteLength){
    // if (this.isPointP2(p)){
    //     // Do not has x2, y2 to make sure
    //     // no two edges have the same point in a sginle polygon
    //   return false;
    // }

    // Vertical, special case
    if (this.p2.x-this.p1.x === 0){
      let delta = Math.abs(p.x-this.p1.x);
      if (delta < Point.TOLERANCE){
        if (infiniteLength){
          return true;
        } else{
          return p.isWithinRect(this.p1,this.p2)
        }
        // y does not matter
      } else {
        return false;
      }
    }

    // Horizontal, special case
    if (this.p2.y-this.p1.y === 0){
      let delta = Math.abs(p.y-this.p1.y);
      if (delta < Point.TOLERANCE){
        if (infiniteLength){
          return true;
        } else{
          return p.isWithinRect(this.p1,this.p2)
        }
        // x does not matter
      } else {
        return false;
      }
    }

    let k = (this.p2.y-this.p1.y)/(this.p2.x-this.p1.x); // Slope
    let yTmp = k*(p.x-this.p1.x)+this.p1.y;

    let delta = Math.abs(p.y-yTmp);
    if (delta < Point.TOLERANCE){
      if (infiniteLength){
        return true;
      } else{
        return p.isWithinRect(this.p1,this.p2)
      }
    }  else {
      // console.log(delta);
      return false;
    }
  }

  // Mirror this with respect to the provided edge
  mirror(edge){
    // console.log(this);
    this.p1.mirror(edge);
    this.p2.mirror(edge);
  }


  // Return intersection point or null
  // Parallel(Overlap) means no intersection
  // Intersect at end points means no intersection
  intersectEdge(edge, infiniteLength){
    // k12 slop of this
    // kab slope of that
    let k12 = (this.p2.y-this.p1.y)/(this.p2.x-this.p1.x);
    let kab = (edge.p2.y-edge.p1.y)/(edge.p2.x-edge.p1.x);
    // console.log(k12,kab);

    if (k12 === kab) return null; // Parallel, no intersection

    // Must have an intersection
    let x, y;
    if (!isFinite(k12)){
      x = this.p1.x;
      y = (x-edge.p1.x)*kab+edge.p1.y;
    } else if (!isFinite(kab)){
      x = edge.p1.x;
      y = (x-this.p1.x)*k12+this.p1.y;
    } else {
      x = ((edge.p1.y-this.p1.y)-kab*edge.p1.x+k12*this.p1.x)/(k12-kab);
      y = (x-edge.p1.x)*kab+edge.p1.y;
    }

    let point = new Point(x,y);

    if (infiniteLength) return point;

    // If not on both edges, not intersecting
    if (!point.isWithinRect(this.p1, this.p2) | !point.isWithinRect(edge.p1, edge.p2)) return null;

    // Not include both end points
    if (edge.isPointP1(point) ||
        edge.isPointP2(point) ||
        this.isPointP1(point) ||
        this.isPointP2(point)) return null;

    return point;
  }


}
