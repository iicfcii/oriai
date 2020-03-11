import { Origami } from './Origami';
import { Crease } from './Crease';
import { Fold } from './Fold';
import { Edge } from './Edge';
import { Point } from './Point';

export class Design {
  constructor(){
    // Meta info
    this.name = undefined;
    this.creator = undefined;
    this.email = undefined;
    this.designer = undefined;

    // Origami
    this.origamis = [new Origami()]; // always have a plain paper
    this.steps = []; // Array of crease and fold
  }

  addStep(step){
    let origami = new Origami();

    this.steps.forEach((s) => {
      s.do(origami);
    });

    let result = step.do(origami);

    if (result === step.RESULT_SUCCESSFUL) {
      this.origamis.push(origami);
      this.steps.push(step);
    }

    return result;
  }

  removeLastStep(){
    if (this.steps.length === 0) return false;
    this.origamis.splice(this.origamis.length-1,1);
    this.steps.splice(this.steps.length-1,1);
    return true;
  }

  getOrigami(origamiIndex){
    return this.origamis[origamiIndex];
  }

  getStep(stepIndex){
    return this.steps[stepIndex];
  }

  // Return JSON string
  save(){
    let steps = [];
    this.steps.forEach((step) => {
      steps.push(step.getObject());
    });

    let object = {
      name: this.name,
      creator: this.creator,
      email: this.email,
      designer: this.designer,
      steps: steps,
    }
    return JSON.stringify(object, null, 2 );
  }

  // Will override current design
  load(jsonStr){
    let design = JSON.parse(jsonStr);
    // Meta info
    this.name = design.name;
    this.creator = design.creator;
    this.email = design.email;
    this.designer = design.designer;

    // Steps
    // Reset origamis and steps
    this.origamis = [new Origami()];
    this.steps = [];
    // Load new steps
    design.steps.forEach((step) => {
      if (!step.directions){
        // Crease
        this.addStep(new Crease(step.faces,
                                new Edge(new Point(step.edge[0],step.edge[1]),
                                         new Point(step.edge[2],step.edge[3]))));
      } else {
        // Fold
        this.addStep(new Fold(step.faces,
                              new Edge(new Point(step.edge[0],step.edge[1]),
                                       new Point(step.edge[2],step.edge[3])),
                              step.directions));
      }
    });
  }
}
