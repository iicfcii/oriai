export class Point {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  static get TOLERANCE(){
    return 1e-6;
  }

  isEqual(p){
    if (Math.abs(p.x-this.x) < Point.TOLERANCE && Math.abs(p.y-this.y) < Point.TOLERANCE){
      return true;
    } else {
      return false;
    }
  }

  // Return a flat list [x, y] with the ratio and offset(x,y)
  scale(ratio, x, y) {
    return [this.x*ratio+x, this.y*ratio+y];
  }

  // Within the rectangle defined by p1 and p2
  isWithinRect(p1, p2){
    let isWithinRange = true;
    if (p1.x < p2.x) {
      isWithinRange &= (this.x >= p1.x && this.x <= p2.x);
    } else {
      isWithinRange &= (this.x >= p2.x && this.x <= p1.x);
    }

    if (p1.y < p2.y) {
      isWithinRange &= (this.y >= p1.y && this.y <= p2.y);
    } else {
      isWithinRange &= (this.y >= p2.y && this.y <= p1.y);
    }

    return isWithinRange;
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
  isInFace = (face) => {
    let wn = 0; // the  winding number counter
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

}
