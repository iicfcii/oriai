# OriAI
An 2D origami simulator for now.

## Basic structure
- An origami contains faces which contains edges.
- An edge has up to two parent faces, that is, boundary edge has one, crease edge has two(Should be correct).
- Two faces can share an crease edge(two twin objects).
- A crease breaks a face into two faces, the edges will also be broken.
- A crease does not need to go through the entire paper.
- A crease can affect multiple faces.
- A fold can only be folded along a single crease.
- A fold can affect multiple faces such as inside reverse fold, fold several layers together, sink fold.
- A fold changes the edges of the faces.
- A fold changes faces layers. Layer number is always >= 0.
- Each face has a layer number to indicate z axis position.

## Classes
### Design
- Attributes
  - origamis (origamis after each step)
  - steps (crease and fold)
- Methods
  - addStep(step) (create a new origami and perform all steps and save the origami)
  - getOrigami(stepIndex) (return origami after certain steps)

### Origami
- Attributes
  - faces
  - layers
- Methods
  - getFaceByID
  - getFacesByLayer

### Crease
- Attributes
  - faceIDs
  - crease
- Methods
  - do(origami)

### Fold
- Attributes
  - faceIDs
  - foldEdge
  - directions
- Methods
  - do(origami)

## Features List
- Explore origami designs
  - View a list of exisiting designs
  - View information of the design
  - View each step of the design
  - View each layer of the step
  - View information of ponints, lines, and faces
  - Adjust space between layer
  - Adjust which layer is centered
  - Adjust size
  - Adjust isometric or top view
- Create origami designs
  - Start from a plain paper
  - Save design to local storage
  - Save to the cloud
  - Load design from local storage
  - Load design from cloud
  - Delete(hide) design from cloud given correct email
  - Share the design with others
- Edit origami designs
  - Edit information
  - Add crease and fold
  - Edit crease and fold
  - Delete crease and fold
  - Select faces
  - Select line by line, angle bisector, selecting two endpoints
  - Select point by point, fraction of line, inputting values
  - Set directions for each selected face if fold
  - Preview selected line
  - Preview folded face position
- Learn about the project


## TODO List
- Visuailize step to add: edge set, face selected
- Edit existing steps
- Fix test(jest) with failure message
- Better crease selection: by edge, angle bisector, 1/2, 1/3, 1/4 point of edge
- Remove step confirm
- Auto generate random origami designs, NOT USEFUL
- Any complex fold with multiple faces and creases can be converted into
mulitple simple folds with single creases?

## Hope List
- Automatically generate origami creations and name them based on shape.
- Give a sketch and return folding steps.
  - Search and optimization like genetic algorithm
  - Train a network, sketch -> features -> steps --origami model--> design
