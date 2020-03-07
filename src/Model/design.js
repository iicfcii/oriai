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

  getOrigami(origamiIndex){
    return this.origamis[origamiIndex];
  }

  getStep(stepIndex){
    return this.steps[stepIndex];
  }
}
