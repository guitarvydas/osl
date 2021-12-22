# layer kind
## parameters
  ID
  Direction
## imports
  fb
  shapes
  onSameDiagram
  inside
## forall ID as diagram_fact(kind,ID,"ellipse")
    Direction = cond
      diagram_fact(color, ID, "green")  input
      diagram_fact(color, ID, "yellow") output
      diagram_fact(color, ID, "red")    pervasiveinput
      diagram_fact(color, ID, "purple") pervasiveoutput
      else                              "?"
## cond design rule
  ${Direction} === "?"
  all ports must have a direction ; port ${ID} has no direction
## display
  das_fact(direction,${ID},${Direction}).

