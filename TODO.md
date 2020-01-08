# OriAI
An 2D origami simulator for now.

## Basic structure
- An origami contains faces which contains edges.
- An edge has up to two parent faces, that is, boundary edge has one, crease edge has two(Should be correct).
- Two faces can share an crease edge(two twin objects).
- A crease breaks a face into two faces, the edges will also be broken.
- A crease does not need to go through the entire paper.
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

## TODO List
- Crease and fold multiple faces.
- Check whether fold break twin of crease.
- Visualizer for origami structure.
- Show each step of an origami.

## Hope List
- Automatically generate origami creations and name them based on shape.
