import React, { Component } from 'react';

export class AboutView extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div>
        <h1>Oriai: Fold Origami Online</h1>
        <p>
          Oriai is an online editor that simulates folding of origami.
          This may seem like a stupid idea since paper is everywhere.
          There is no need to use a software for people to enjoy origami.
          However, this project aims to build a database of origami designs.
          All designs are saved in a standard format. This morden database will
          make searching, learning, and sharing origami easier.
          Furthermore, the data collected is valuable for origami research.
          Ultimately, I would like to use the data to build an AI
          that can create origami design given a shape or a name.
        </p>
        <h2>Concept</h2>
        <p>
          Each origami design is saved as an array of steps.
          For now, the steps always start from a square paper of size 1 by 1.
          There are two types of steps, crease and fold.
          Crease divides faces into more faces with a line.
          Fold rotates faces about a line to some layers.
          Layers are introduced to describe the relative locations of faces.
          Each face is made of several lines.
          Each line can either be a crease line or an edge line.
          A crease line connects two faces.
          An edge line is the boundary of the original paper.
          Based on the saved steps, the software generates all the lines and
          faces and their correct relations.
          When adding a step, the software will try to make sure the fold or
          crease is valid.
          For example, it won't crease if the line does not intersect with the face.
          It won't fold if creases are torn apart or faces penetrate creases.
        </p>
        <h2>How to Use</h2>
        <p>
          Generally, it is recommended to fold a real paper while inputting all the steps.
          The structure of the origami can be hard to imagine.
          Some info and settings are listed to provide better demonstration
          of the structure.
          The origami is shown in isometric view. 
          Here are the steps to fold some origami.
          <br/>
          1. Select crease or fold step.
          <br/>
          2. Select faces to be creased or folded.
          Each face is labeled with a number and multiple ones can be selected.
          Change layer spacing and offset if some faces are blocked.
          <br/>
          3. Select or input both end points of the line to crease or fold around.
          <br/>
          4. If it is a fold step, set direction for each face.
          If a face is folded one layer above its original layer, the direction
          will be +1. If folded down one layer, the direction will be -1.
          <br/>
          4. Add the step after everything is defined.
          It shows an error message if the step is impossible to add.
          <br/>
          5. Remove the step if it is incorrect.
          <br/>
          6. After finishing a design, download and save the file
          so it can be loaded in the future.
          <br/>
        </p>
      </div>
    );
  }
}
