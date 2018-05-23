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


export class Origami {

  // Has a single 1*1 face initially
  constructor(){
    this.faces = [];
    let face = new Face();
    face.addEdge(new Edge(0,0,0,1));
    face.addEdge(new Edge(0,1,1,1));
    face.addEdge(new Edge(1,1,1,0));
    face.addEdge(new Edge(1,0,0,0));
    this.faces.push(face);

    // console.log(this.faces[0].edges[0]);
    // console.log(this.faces[0].edges[0].hasPoint(0,-0.5));
    this.crease(0,1,0.5,0);

    this.fold(this.faces[0],0,1,0.5,0);
  }

  // Crease to create more faces
  // Two endpoints of crease line has to lay on edge
  crease(x1, y1, x2, y2) {
    let newFaces = [];

    this.faces.forEach((face) => {
      // Find the two edges endpoints on
      let edge1, edge2;
      face.edges.forEach((edge) => {
        if (edge.hasPoint(x1,y1)){
          edge1 = edge;
        }
        if (edge.hasPoint(x2,y2)){
          edge2 = edge;
        }
      });

      // console.log(edge1);
      // console.log(edge2);

      if (!edge1 || !edge2){
        console.log('Crease Failed');
        // Directly copy the face if crease does not apply to currect face
        newFaces.push(face);
        return false;
      }

      // Helper function to make new faces
      let makeFace = (edge1, edge2, x1, y1, x2, y2) => {
        // Make face 1
        let face1 = new Face();
        let i = 0;

        while(face.edges[i] !== edge1){
          // Add edge until edge1 is found
          face1.addEdge(face.edges[i]);
          i ++;
        }

        // Add p1 to x1y1 edge
        face1.addEdge(new Edge(face.edges[i].x1,face.edges[i].y1,x1,y1));  // Zero length edge won't be added
        i ++;
        // Add x1y1 to x2y2 edge
        face1.addEdge(new Edge(x1,y1,x2,y2));

        while(face.edges[i] !== edge2){
          // Do nothing untile edge2 is found
          i ++;
        }

        face1.addEdge(new Edge(x2,y2,face.edges[i].x2,face.edges[i].y2));
        i ++;
        while(i<face.edges.length){
          face1.addEdge(face.edges[i]);
          i ++;
        }

        // Make face 2
        let face2 = new Face();
        i = 0;

        while(face.edges[i] !== edge1){
          // Do nothing untile edge1 is found
          i ++;
        }

        // Add x1y1 to p2 edge
        face2.addEdge(new Edge(x1,y1,face.edges[i].x2,face.edges[i].y2));
        i ++;

        while(face.edges[i] !== edge2){
          // Add edge untile edge2 is found
          face2.addEdge(face.edges[i]);
          i ++;
        }

        // Add p1 to x2y2 edge
        face2.addEdge(new Edge(face.edges[i].x1,face.edges[i].y1,x2,y2));
        i ++;
        // Add x2y2 to x1y1 edge
        face2.addEdge(new Edge(x2,y2,x1,y1));

        while(i<face.edges.length){
          face2.addEdge(face.edges[i]);
          i ++;
        }
        // console.log('Face1');
        // console.log(face1.edges);
        // console.log('Face2');
        // console.log(face2.edges);

        newFaces.push(face1);
        newFaces.push(face2);
      }

      // Make faces
      if (face.edges.indexOf(edge1) < face.edges.indexOf(edge2)){
        // Will encounter edge 1 first
        makeFace(edge1, edge2, x1, y1, x2, y2);
      } else {
        // Will encounter edge 2 first
        // Swap edge 1 and edge 2, Swap x1y1 and x2y2
        makeFace(edge2, edge1, x2, y2, x1, y1);
      }

    });

    this.faces = newFaces;
    console.log(this.faces);
    return true;
  }

  // Fold a face along a crease
  // Line has to be one of the edge
  fold(face, x1, y1, x2, y2){
    let creaseIndex = null;
    // Find the edge
    for (let i = 0; i < face.edges.length; i ++){
      if (face.edges[i].isP1(x1,y1) && face.edges[i].isP2(x2,y2)){
        // Edge found
        creaseIndex = i;
      } else if (face.edges[i].isP1(x2,y2) && face.edges[i].isP2(x1,y1)){
        // Edge found
        creaseIndex = i;
      }
    }

    if (creaseIndex === null){
      console.log('Invalid crease');
      return false;
    }

    console.log('Valid crease');

    // Simply reflect points for remaining edges
    // Order should be correct even after reflect
    for (let i = creaseIndex; i < face.edges.length; i ++){
      face.edges[creaseIndex].reflectEdge(face.edges[i]);
    }

    for (let i = 0; i < creaseIndex; i ++){
      face.edges[creaseIndex].reflectEdge(face.edges[i]);
    }

    console.log(this.faces);

  }
}
