import { Face } from './face';
import { Edge } from './edge';

export class Crease {
  constructor(faceIDs, crease){
    this.faceIDs = faceIDs;
    this.crease = crease;
  }

  getDescription(){
    return 'Crease faces ' + this.faceIDs + ' along line (' +
           this.crease.p1.x.toFixed(2) + ', '+ this.crease.p1.y.toFixed(2) + ') to (' +
           this.crease.p2.x.toFixed(2) + ', '+ this.crease.p2.y.toFixed(2) + ')';
  }

  do(origami){
    return this.faceIDs.every((faceID) => {
      return this.singleCrease(origami, faceID, this.crease)
    });
  }

  // face: face of a origami to be creased, will be removed after new ones are generated
  // edge: proposed creasing line, infinite length
  singleCrease(origami, faceID, crease){
    let face = origami.getFaceByID(faceID);
    if (!face){
      console.log('No such face to crease');
      return false;
    }
    let edge = face.intersectEdge(crease, true);
    if (edge === null) {
      console.log('No such crease');
      return false;
    }

    // Assumed order
    let p1 = edge.p1;
    let p2 = edge.p2;
    let edge1Index = null;
    let edge2Index = null;
    let id = face.id; // Original id

    // Find the index of the two edges that the crease end points are on
    for (let i = 0; i < face.edges.length; i ++){
      if (face.edges[i].hasPoint(p1)){
        edge1Index = i;
      }
      if (face.edges[i].hasPoint(p2)){
        edge2Index = i;
      }
    }

    if (edge1Index === null || edge2Index === null){
      console.log('Crease Failed');
      return false;
    }

    if (edge1Index > edge2Index){
      // Order not correct, flip
      p1 = edge.p2;
      p2 = edge.p1;
      let edgeTmpIndex = edge1Index; // Temp variable to save the index
      edge1Index = edge2Index;
      edge2Index = edgeTmpIndex;
    }

    // Helper function
    let addFixedEdge = (faceTmp, edgeTmp) => {
      // If invalid, don't add.
      if (!edgeTmp.isValid()) return;

      if (edgeTmp.isBoundary){
        // If just a boundary fix parent and add
        edgeTmp.parentFace1 = faceTmp;
        faceTmp.addEdge(edgeTmp);
      }
      if (edgeTmp.isCrease){
        // console.log('Crease', edgeTmp);
        // Fix the same crease on other face if exists
        let f = edgeTmp.parentFace2;
        let indexList = f.edgeIndexList(edgeTmp, true); // Use infinite length
        if (indexList.length > 0) {
          let index = indexList[0]; // Default to first match
          if (indexList.length > 1){
            // If more than one edge, should be able to find an exact one
            let hasExactMatch = false;
            for (let j = 0; j < indexList.length; j ++){
              if (f.edges[indexList[j]].isEqual(edgeTmp, true)){
                index = indexList[j];
                hasExactMatch = true;
              }
            }
            if (!hasExactMatch){
              console.log('Not sure which match to use');
            }
          }
          if (f.hasEdge(edgeTmp, true)){
            // Edge already exists on other face, not broken
            f.edges[index].parentFace2 = faceTmp;
          } else {
            // Create new edges for the other face
            let face = new Face(f.id);

            let k = 0;
            while (k < index){
              face.addEdge(f.edges[k]);
              k += 1;
            }

            let p; // The point not end point
            if (f.edges[k].isPointP1(edgeTmp.p1) || f.edges[k].isPointP2(edgeTmp.p1)){
              p = edgeTmp.p2.copy;
            } else {
              p = edgeTmp.p1.copy;
            }
            face.addEdge(new Edge(f.edges[k].p1.copy,p,f.edges[k].parentFace1,faceTmp));
            face.addEdge(new Edge(p,f.edges[k].p2.copy,f.edges[k].parentFace1,faceTmp));
            k += 1;
            while (k < f.edges.length){
              face.addEdge(f.edges[k]);
              k += 1;
            }

            f.edges = face.edges;
          }
          // parentFace1 will always be the one that need fix
          // A face's crease will always has itself as the first parent
          edgeTmp.parentFace1 = faceTmp;
          faceTmp.addEdge(edgeTmp);
        }
      }
    }

    // Make face 1
    let face1 = new Face(id); // face 1 use original id
    face1.layer = face.layer;
    let i = 0;
    while(i < edge1Index){
      addFixedEdge(face1, face.edges[i]);
      i ++;
    }
    // Add p1 to x1y1 edge
    addFixedEdge(face1, new Edge(face.edges[i].p1.copy,p1.copy,face.edges[i].parentFace1,face.edges[i].parentFace2));
    i ++;
    // Add x1y1 to x2y2 edge
    let newCrease1 = new Edge(p1.copy,p2.copy,face1); // Should fix the parent later in this function
    face1.addEdge(newCrease1);
    i = edge2Index;
    addFixedEdge(face1, new Edge(p2.copy,face.edges[i].p2.copy,face.edges[i].parentFace1,face.edges[i].parentFace2));
    i ++;
    while(i<face.edges.length){
      addFixedEdge(face1, face.edges[i]);
      i ++;
    }
    // Make face 2
    let face2 = new Face(origami.faces.length+1); // face 2 increment id
    face2.layer = face.layer;
    i = edge1Index;
    // Add x1y1 to p2 edge
    addFixedEdge(face2, new Edge(p1.copy,face.edges[i].p2.copy,face.edges[i].parentFace1,face.edges[i].parentFace2));
    i ++;
    while(i !== edge2Index){
      // Add edge until edge2 is found
      addFixedEdge(face2, face.edges[i]);
      i ++;
    }
    // Add p1 to x2y2 edge
    addFixedEdge(face2, new Edge(face.edges[i].p1.copy,p2.copy,face.edges[i].parentFace1,face.edges[i].parentFace2));
    i ++;
    // Add x2y2 to x1y1 edge
    newCrease1.parentFace2 = face2; // Fix previous one here
    let newCrease2 = new Edge(p2.copy,p1.copy,face2,face1);
    face2.addEdge(newCrease2);

    // console.log(face1);
    // console.log(face2);

    origami.faces.splice(origami.faces.indexOf(face), 1, face1); // Replace original face
    origami.faces.push(face2);

    origami.sortFaces();
    return true;
  }
}
