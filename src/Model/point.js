export class Point {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  static get TOLERANCE(){
    return 1e-6;
  }

  get copy(){
    return new Point(this.x, this.y);
  }

  isEqual(p){
    if (Math.abs(p.x-this.x) < Point.TOLERANCE && Math.abs(p.y-this.y) < Point.TOLERANCE){
      return true;
    } else {
      return false;
    }
  }

  // Return a flat list [x, y] with the ratio and offset(x,y)
  // angle in degrees, angle wrt positive x
  scale(layout) {
    let ratio = layout.ratio;
    let x = layout.x;
    let y = layout.y;
    let angle = layout.angle;
    // x' = x*Ctheta-y*Stheta
    // y' = x*Stheta+y*Ctheta
    let theta = angle/180*Math.PI; // to radian
    return [
      (this.x*Math.cos(theta)-this.y*Math.sin(theta))*ratio+x,
      (this.x*Math.sin(theta)+this.y*Math.cos(theta))*ratio+y,
    ];
  }

  // Directly modify the point
  mirror(edge) {
    let e = [edge.p2.x-edge.p1.x, edge.p2.y-edge.p1.y]; // edge vector
    let pt = [this.x-edge.p1.x, this.y-edge.p1.y]; // point vector

    // p dot e / e dot e
    let mag = (pt[0]*e[0]+pt[1]*e[1])/(e[0]*e[0]+e[1]*e[1]);
    let proj = [e[0]*mag,e[1]*mag]; // projection vector
    // console.log(proj);

    // Projected point
    let xo = edge.p1.x+proj[0];
    let yo = edge.p1.y+proj[1];
    // console.log(xo,yo);

    // Go to other side of edge
    let xr = this.x-2*(this.x-xo);
    let yr = this.y-2*(this.y-yo);
    // console.log(xr,yr);

    this.x = xr;
    this.y = yr;
    // return new Point(xr, yr);
  }

  // Within the rectangle defined by p1 and p2
  isWithinRect(p1, p2){
    let isWithinRange = true;
    if (p1.x < p2.x) {
      isWithinRange &= (this.x >= p1.x-Point.TOLERANCE && this.x <= p2.x+Point.TOLERANCE);
    } else {
      isWithinRange &= (this.x >= p2.x-Point.TOLERANCE && this.x <= p1.x+Point.TOLERANCE);
    }

    if (p1.y < p2.y) {
      isWithinRange &= (this.y >= p1.y-Point.TOLERANCE && this.y <= p2.y+Point.TOLERANCE);
    } else {
      isWithinRange &= (this.y >= p2.y-Point.TOLERANCE && this.y <= p1.y+Point.TOLERANCE);
    }

    return isWithinRange === 1;
  }

  // NOTE THE COORDINATE SYSTEM!!!!!!!
  // isLeft(): tests if a point is Left|On|Right of an infinite line.
  //    Input:  three points P0(x0, y0), P1(x1, y1), and P2(x2. y2)
  //    Return: >0 for P2 left of the line through P0 and P1
  //            =0 for P2  on the line
  //            <0 for P2  right of the line
  //    See: Algorithm 1 "Area of Triangles and Polygons"
  isLeft(p0, p1){
    return ((p1.x-p0.x)*(this.y-p0.y)-(this.x-p0.x)*(p1.y-p0.y));
  }


  // return true only when inside
  isInFace(face){
    let wn = 0; // the winding number counter
    for (let i = 0; i < face.edges.length; i ++){
      let edge = face.edges[i];
      if (edge.hasPoint(this)) return false; // on edge, return false
      if (edge.p1.y <= this.y){
        if (edge.p2.y > this.y){
          if (this.isLeft(edge.p1, edge.p2) > 0){
            wn ++;
          }
        }
      } else {
        if (edge.p2.y <= this.y){
          if (this.isLeft(edge.p1, edge.p2) < 0){
            wn --;
          }
        }
      }
    };

    return wn === 0 ? false : true;
  }

  isOutsideFace(face){
    if (this.isInFace(face)) return false;

    // If on edge, not outside
    for (let i = 0; i < face.edges.length; i ++){
      if (face.edges[i].hasPoint(this)) return false;
    }

    return true;
  }

}
