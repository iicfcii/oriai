import { Face } from './face';
import { Edge } from './edge';
import { Point } from './point';

export class Origami {
  // Has a single 1*1 face initially
  constructor(){
    this.faces = [];
    this.layers = [0];

    // Add the initial face
    let face = new Face(1); // Starting id is 1
    face.addEdge(new Edge(new Point(0,0),new Point(1,0), face));
    face.addEdge(new Edge(new Point(1,0),new Point(1,1), face));
    face.addEdge(new Edge(new Point(1,1),new Point(0,1), face));
    face.addEdge(new Edge(new Point(0,1),new Point(0,0), face));
    this.faces.push(face);
  }

  updateLayers() {
    // Remove empty layers
    let emptyLayers  = [];
    this.layers.forEach((layer) => {
      let faces = this.getFacesByLayer(layer);
      if (faces.length === 0) emptyLayers.push(layer);
    });

    // Reduce layer for affected faces
    emptyLayers.forEach((emptyLayer) => {
      const index = this.layers.indexOf(emptyLayer);
      if (index > -1) this.layers.splice(index, 1);

      this.faces.forEach((face) => {
        if (face.layer > emptyLayer){
          face.layer = face.layer - 1;
        }
      });
    });

    // Add new Layers
    this.layers = [];
    this.faces.forEach((face) => {
      if (!this.layers.includes(face.layer)){
        this.layers.push(face.layer);
      }
    });

  }

  get maxLayer() {
    return Math.max(...this.layers);
  }

  get minLayer() {
    return Math.min(...this.layers);
  }

  getFaceByID(id){
    for (let i = 0; i < this.faces.length; i ++){
      if (this.faces[i].id === id){
        return this.faces[i];
      }
    }
  }

  getFacesByLayer(layer){
    let faces = [];
    for (let i = 0; i < this.faces.length; i ++){
      if (this.faces[i].layer === layer){
        faces.push(this.faces[i]);
      }
    }
    return faces;
  }

  showLayersOnly(layers){
    this.faces.forEach((face) => {
      if (layers.indexOf(face.layer) !== -1) {
        face.isShown = true;
      } else {
        face.isShown = false;
      }
    });
  }

  sortFaces(){
    this.faces.sort((face1, face2) => {
      if (face1.layer <= face2.layer){
        return -1;
      } else {
        return 1;
      }
    });
  }
}
