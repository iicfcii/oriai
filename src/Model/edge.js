import { Point } from './point';

// Edge

export class Edge {
  constructor(p1, p2, isBound){
    // p1
    this.p1 = p1;
    // p2
    this.p2 = p2;

    if (isBound === undefined){
      this.isBound = true;
    } else {
      this.isBound = isBound;
    }

    this.selected = false;
  }

  get key(){
    let p = [this.p1.x,this.p1.y,this.p2.x,this.p2.y];
    let key = p.map(String);
    return key.join('');
  }

  isValid(){
      if (this.isPointP1(this.p2.x, this.p2.y)){
        // Zero length edge
        return false;
      } else {
        return true;
      }
  }

  isEqual(edge, isOrderIgnored){
    if (this.p1.isEqual(edge.p1) &&
        this.p2.isEqual(edge.p2)){
      return true;
    }

    if (isOrderIgnored &&
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
  hasPoint(p){
    // if (this.isPointP2(p)){
    //     // Do not has x2, y2 to make sure
    //     // no two edges have the same point in a sginle polygon
    //   return false;
    // }

    // Vertical, special case
    if (this.p2.x-this.p1.x === 0){
      let delta = Math.abs(p.x-this.p1.x);
      if (delta < Point.TOLERANCE && p.isWithinRect(this.p1,this.p2)){
        // y does not matter
        // console.log(this);
        return true;
      } else {
        return false;
      }
    }

    let k = (this.p2.y-this.p1.y)/(this.p2.x-this.p1.x); // Slope
    let yTmp = k*(p.x-this.p1.x)+this.p1.y;

    let delta = Math.abs(p.y-yTmp);
    if (delta < Point.TOLERANCE && p.isWithinRect(this.p1,this.p2)){
      // console.log(this);
      return true;
    }  else {
      // console.log(delta);
      return false;
    }
  }

  // Reflect a point across this edge
  reflectPoint(p){
    let e = [this.p2.x-this.p1.x, this.p2.y-this.p1.y]; // edge vector
    let pt = [p.x-this.p1.x, p.y-this.p1.y]; // point vector

    // p dot e / e dot e
    let mag = (pt[0]*e[0]+pt[1]*e[1])/(e[0]*e[0]+e[1]*e[1]);
    let proj = [e[0]*mag,e[1]*mag]; // projection vector
    // console.log(proj);

    // Projected point
    let xo = this.p1.x+proj[0];
    let yo = this.p1.y+proj[1];
    // console.log(xo,yo);

    // Go to other side of edge
    let xr = p.x-2*(p.x-xo);
    let yr = p.y-2*(p.y-yo);
    // console.log(xr,yr);

    return new Point(xr, yr);
  }

  // Directly modify the edge
  reflectEdge(edge){
    let p1 = this.reflectPoint(edge.p1);
    let p2 = this.reflectPoint(edge.p2);

    edge.p1 = p1;
    edge.p2 = p2;
  }


  // Return intersection point or null
  // Parallel(Overlap) means no intersection
  // Intersect at end points means no ntersection
  intersectEdge(edge){
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
    if (!point.isWithinRect(edge.p1, edge.p2)) return null;

    // Not include both end points
    if (edge.isPointP1(point) ||
        edge.isPointP2(point) ||
        this.isPointP1(point) ||
        this.isPointP2(point)) return null;

    return point;
  }


}
