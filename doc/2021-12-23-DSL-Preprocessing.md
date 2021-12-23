# Input
```
# layer kind
## parameters
  X
  Kind
## imports
  shapes
  onSameDiagram
  inside
  names
  ports
  contains
## forall X as diagram_fact(cell,X,_)
    Kind = cond
      diagram_fact(kind,X,"ellipse") "ellipse"
      diagram_fact(edge,X,1)         "edge"
      diagram_fact(root,X,1)         "root"
     else                            "rectangle"
## display
  das_fact(kind,${X},${Kind}).
```
# Output
We use a DSL to preprocess the above DSL.

The preprocessor looks for `forall` blocks and turns them into `query` blocks.

The preprocessor leaves everything else alone.

```
# layer kind
## parameters
  X
  Kind
## imports
  shapes
  onSameDiagram
  inside
  names
  ports
  contains
## query
diagram_fact(cell,X,_) 
(diagram_fact(kind,X,"ellipse")  -> Kind = "ellipse";diagram_fact(edge,X,1)  -> Kind = "edge";diagram_fact(root,X,1)  -> Kind = "root"; Kind = "rectangle")
## display
  das_fact(kind,${X},${Kind}).

```
# Video
see ![Forall DSL Preprocessor](forall-preprocessor-Screen-Recording-2021-12-23-at-9.57.22-AM 1.mov)