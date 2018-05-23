// Edge

export class Edge {
  constructor(x1, y1, x2, y2){
    // p1
    this.x1 = x1;
    this.y1 = y1;
    // p2
    this.x2 = x2;
    this.y2 = y2;

    this.tolerance = 1e-6
  }
  static get TOLERANCE(){
    return 1e-6;
  }

  isValid(){
      if (this.isP1(this.x2, this.y2)){
        // Zero length edge
        return false;
      } else {
        return true;
      }
  }

  isEqual(edge){
    if (this.x1 === edge.x1 &&
        this.y1 === edge.y2 &&
        this.x2 === edge.x2 &&
        this.y2 === edge.y2){
      return true;
    }

    return false;
  }

  isP1(x,y){
    if (Math.abs(x-this.x1) < Edge.TOLERANCE && Math.abs(y-this.y1) < Edge.TOLERANCE){
      return true;
    } else {
      return false;
    }
  }

  isP2(x,y){
    if (Math.abs(x-this.x2) < Edge.TOLERANCE && Math.abs(y-this.y2) < Edge.TOLERANCE){
      return true;
    } else {
      return false;
    }
  }

  hasPoint(x, y){
    if (this.isP2(x,y)){
        // Do not has x2, y2 to make sure
        // no two edges have the same point in a sginle polygon
      return false;
    }

    // Vertical, special case
    if (this.x2-this.x1 === 0){
      let delta = Math.abs(x-this.x1);
      if (delta < Edge.TOLERANCE && this.isPointWithinRange(x,y,this.x1,this.y1,this.x2,this.y2)){
        // y does not matter
        // console.log(this);
        return true;
      } else {
        return false;
      }
    }

    let k = (this.y2-this.y1)/(this.x2-this.x1); // Slope
    let yTmp = k*(x-this.x1)+this.y1;

    let delta = Math.abs(y-yTmp);
    if (delta < Edge.TOLERANCE && this.isPointWithinRange(x,y,this.x1,this.y1,this.x2,this.y2)){
      // console.log(this);
      return true;
    }  else {
      // console.log(delta);
      return false;
    }
  }

  isPointWithinRange(x,y,x1,y1,x2,y2){
    let isWithinRange = true;
    if (x1 < x2) {
      isWithinRange &= (x >= x1 && x <= x2);
    } else {
      isWithinRange &= (x >= x2 && x <= x1);
    }

    if (y1 < y2) {
      isWithinRange &= (y >= y1 && y <= y2);
    } else {
      isWithinRange &= (y >= y2 && y <= y1);
    }

    return isWithinRange;
  }

  // Reflect a point across this edge
  reflectPoint(x,y){
    let e = [this.x2-this.x1, this.y2-this.y1]; // edge vector
    let p = [x-this.x1, y-this.y1]; // point vector

    // p dot e / e dot e
    let mag = (p[0]*e[0]+p[1]*e[1])/(e[0]*e[0]+e[1]*e[1]);
    let proj = [e[0]*mag,e[1]*mag]; // projection vector
    // console.log(proj);

    // Projected point
    let xo = this.x1+proj[0];
    let yo = this.y1+proj[1];
    // console.log(xo,yo);

    // Go to other side of edge
    let xr = x-2*(x-xo);
    let yr = y-2*(y-yo);
    // console.log(xr,yr);

    return {
      x: xr,
      y: yr,
    }
  }

  // Directly modify the edge
  reflectEdge(edge){
    let p1 = this.reflectPoint(edge.x1, edge.y1);
    let p2 = this.reflectPoint(edge.x2, edge.y2);

    edge.x1 = p1.x;
    edge.y1 = p1.y;
    edge.x2 = p2.x;
    edge.y2 = p2.y;
  }
}
