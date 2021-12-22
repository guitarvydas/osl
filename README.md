# Elevator Pitch

Source code transpiler that works on blocks of text bracketed by REGEXPs, using PEG to transpile the blocks.

# Status
in development

# Keywords, Key ideas

- pre-processor based on PEG (Ohm-JS)
- macro expansion
- markdown as a multi-language format (in sample test code)
- REGEX scanning for finding text blocks
- Ohm-JS transpilation of text blocks

# usage:

./run.bash

# Gist...

This is meant to be a command-line tool which accepts:
1. an input file for transpilation and macro-expansion
2. a .OHM grammar file
3. a .OSL semantic specification (rewrite rules)
4. a beginning REGEX bracket
5. a terminating REGEX bracket

This tool reads the input file line-by-line.

Every block of lines that are bracketed by REGEX brackets (see below) are fed to Ohm-JS+OSL, transpiled, then re-scanned (like macros).

Expansion grammar allows arbitrary JS for now (hoping to get ideas of what the 90% DSL would be, but using JS for now)

# Name

OSL == Ohm-JS Semantic Language (suggestions welcome :-)

# Install
npm install pako
npm install atob
npm install ohm-js@next

# Sample Code

The test was inspired by my need to create a DSL - using markdown as a multi-language format.

The test file is `in.md`.

The test contains SWIPL and JS code and a syntactic layer called "forall".

In the end, all layers must resolve to either (1) SWIPL code, or, (2) JS code.

The test input file is transpiled as below:

## Input
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
## Transpiled Output
The test transpiler looks for all `## forall ... ##` blocks and reformats them to `query` blocks[^1]

[^1]:What is a `query` block? Roughly, it is a lump of SWIPL code (PROLOG). The syntax for this is inspired and used in the `das2f` tool. For this project, you don't need to know what a query block is, just what the input is and what the intended output is.
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

# Future

- rewrite Glue tool using OSL

- create a DSL mini-language for OSL specifications
