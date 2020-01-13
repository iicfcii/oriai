import { Origami } from './origami';

export class Design {
  constructor(name){
    this.name = name;
    this.origamis = [new Origami()]; // always have a plain paper
    this.steps = []; // Array of crease and fold
  }

  addStep(step){
    let origami = new Origami();

    this.steps.forEach((s) => {
      s.do(origami);
    });

    let isSuccessful = step.do(origami);
    if (isSuccessful) {
      this.origamis.push(origami);
      this.steps.push(step);
    }

    return isSuccessful;
  }

  getOrigami(stepIndex){
    if (stepIndex > this.origamis.length-1) return;
    return this.origamis[stepIndex];
  }
}
