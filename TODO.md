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

## TODO List
- Fold multiple faces.
  - Complex crease and fold
- Check whether fold is valid.
  - Each edge as a fold may need to know its sibling(the one created because of the fold).
  - Check layer after fold to avoid impossible folds.
  - Check if fold breaks any edge connection(separate faces)
- Visualizer for origami structure.
  - Check each layer
  - Perspective view?
  - UI: buttons, lists, text...
  - Interactions: folds

## Hope List
- Automatically generate origami creations and name them based on shape.
