# Oriai
Fold Origami Online

[Visit website](https://oriai.app/)

## Introduction
Oriai is an online editor that simulates folding of origami. This may seem like a stupid idea since paper is everywhere. There is no need to use a software for people to enjoy origami. However, this project aims to build a database of origami designs. All designs are saved in a standard format. This morden database will make searching, learning, and sharing origami easier. Furthermore, the data collected is valuable for origami research. Ultimately, I would like to use the data to build an AI that can create origami design given a shape or a name.

## Concept
Each origami design is saved as an array of steps. For now, the steps always start from a square paper of size 1 by 1. There are two types of steps, crease and fold. Crease divides faces into more faces with a line. Fold rotates faces about a line to some layers. Layers are introduced to describe the relative locations of faces. Each face is made of several lines. Each line can either be a crease line or an edge line. A crease line connects two faces. An edge line is the boundary of the original paper. Based on the saved steps, the software generates all the lines and faces and their correct relations. When adding a step, the software will try to make sure the fold or crease is valid. For example, it won't crease if the line does not intersect with the face. It won't fold if creases are torn apart or faces penetrate creases.

## TODO
This is an onging project and many features are missing. Here is an incomplete list of future features.
1. Visualization of the step to be added. Show faces and line selected.
2. Ability to edit existing steps.
3. Easier line selection. Ability to select edge, angle bisector, and endpoint at fraction of existing line.
4. Better UI/UX.
5. Database functions such as submit, edit, delete, view, sort.
6. Versioning and changelog.
