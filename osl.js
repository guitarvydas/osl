#!/usr/bin/env node
'use strict'

var argv = require('yargs/yargs')(process.argv.slice(2)).argv;

const fs = require ('fs');

var reTrigger;
var reEnd;


var traceDepth;

var ohm = require ('ohm-js');
var support;

const oslGrammar =
      String.raw`
SemanticsSCL {
  Semantics = semanticsStatement+
  semanticsStatement = ruleName ws* "[" ws* parameters "]" ws* "=" ws* code? rewrites ws*

  ruleName = letter1 letterRest*
  
  parameters = parameter*
  parameter = treeparameter | flatparameter
  flatparameter = fpws | fpd
  fpws = pname ws+
  fpd = pname delimiter
  treeparameter = "@" tflatparameter
  tflatparameter = tfpws | tfpd
  tfpws = pname ws+
  tfpd = pname delimiter

  pname = letterRest letterRest*
  rewrites = rw1 | rw2
  rw1 = "[[" ws* code? rwstringWithNewlines "]]" ws*
  rw2 = rwstring

  letter1 = "_" | "a" .. "z" | "A" .. "Z"
  letterRest = "0" .. "9" | letter1

  comment = "%%" notEol* eol
  notEol = ~eol any
  
  eol = "\n"
  ws = comment | eol | " " | "\t" | "," 
  delimiter = &"]" | &"="

  rwstring = stringchar*
  stringchar = ~"\n" any

  rwstringWithNewlines = nlstringchar*
   nlstringchar = ~"]]" ~"}}" any
  code = "{{" ws* codeString "}}" ws* 
  codeString = rwstringWithNewlines

}
`;


var varNameStack = [];


var oslSemantics = {	
    Semantics: function (_1s) { 
	var __1s = _1s._osl ().join (''); 
	return `
{
${__1s}
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c._osl ()); }
}`; 
    },
    semanticsStatement: function (_1, _2s, _3, _4s, _5, _6, _7s, _8, _9s, _10s, _11, _12s) {
	varNameStack = [];
	var __1 = _1._osl ();
	var __2s = _2s._osl ().join ('');
	var __3 = _3._osl ();
	var __4s = _4s._osl ().join ('');
	var __5 = _5._osl ();
	var __6 = _6._osl ();
	var __7s = _7s._osl ().join ('');
	var __8 = _8._osl ();
	var __9s = _9s._osl ().join ('');
	var __10s = _10s._osl ().join ('');
	var __11 = _11._osl ();
	var __12s = _12s._osl ().join ('');
	return `
${__1} : function (${__5}) { 
_ruleEnter ("${__1}");
${__10s}
${varNameStack.join ('\n')}
var _result = \`${__11}\`; 
_ruleExit ("${__1}");
return _result; 
},
            `;
    },
    ruleName: function (_1, _2s) { var __1 = _1._osl (); var __2s = _2s._osl ().join (''); return __1 + __2s; },
    parameters: function (_1s) {  var __1s = _1s._osl ().join (','); return __1s; },
    
    parameter: function (_1) { 
	var __1 = _1._osl ();
	return `${__1}`;
    },
    flatparameter: function (_1) { 
	var __1 = _1._osl (); 
	varNameStack.push (`var ${__1} = _${__1}._osl ();`);
	return `_${__1}`;
    },
    fpws: function (_1, _2s) { var __1 = _1._osl (); var __2s = _2s._osl ().join (''); return __1; },
    fpd: function (_1, _2) { var __1 = _1._osl (); var __2 = _2._osl (); return __1; },
    
    treeparameter: function (_1, _2) { 
	var __1 = _1._osl (); 
	var __2 = _2._osl (); 
	varNameStack.push (`var ${__2} = _${__2}._osl ().join ('');`);
	return `_${__2}`; 
    },
    tflatparameter: function (_1) { 
	var __1 = _1._osl (); 
	return `${__1}`;
    },
    tfpws: function (_1, _2s) { var __1 = _1._osl (); var __2s = _2s._osl ().join (''); return __1; },
    tfpd: function (_1, _2) { var __1 = _1._osl (); var __2 = _2._osl (); return __1; },

    pname: function (_1, _2s) { var __1 = _1._osl (); var __2s = _2s._osl ().join (''); return __1 + __2s;},
    rewrites: function (_1) { var __1 = _1._osl (); return __1; },
    rw1: function (_1, _2s, codeQ, _3, _4, _5s) {
	var __2 = _2s._osl ().join ('');
	var code = codeQ._osl ();
	var __3 = _3._osl ();
	if (0 === code.length) {
  	    return `${__2}${__3}`;
	} else {
	    process.stderr.write ('code is NOT empty\n');
	    throw "code in rw1 NIY";
  	    return `${code}${__3}`;
	}
    },
    rw2: function (_1) { var __1 = _1._osl (); return __1; },
    letter1: function (_1) { var __1 = _1._osl (); return __1; },
    letterRest: function (_1) { var __1 = _1._osl (); return __1; },

    ws: function (_1) { var __1 = _1._osl (); return __1; },
    delimiter: function (_1) { return ""; },

    rwstring: function (_1s) { var __1s = _1s._osl ().join (''); return __1s; },
    stringchar: function (_1) { var __1 = _1._osl (); return __1; },
    rwstringWithNewlines: function (_1s) { var __1s = _1s._osl ().join (''); return __1s; },
    nlstringchar: function (_1) { var __1 = _1._osl (); return __1; },

    code: function (_1, _2s, _3, _4, _5s) { return _3._osl (); },
    codeString: function (_1) { return _1._osl (); },

    // Ohm v16 requires ...children, previous versions require no ...
    _iter: function (...children) { return children.map(c => c._osl ()); },
    _terminal: function () { return this.sourceString; }
};


function ohm_parse (grammar, text, errorMessage) {
    var parser = ohm.grammar (grammar);
    var cst = parser.match (text);
    if (cst.succeeded ()) {
	return { parser: parser, cst: cst };
    } else {
	// console.error (parser.trace (text).toString ());
	// console.error (text.length);
	// console.error ("/" + text + "/");
	// or ... console.error (text);
	var pos = cst._rightmostFailurePosition;
	console.error ("---");
	console.error (text.substring (0, pos));
	console.error ("---");
	console.error (text.substring (pos));
	console.error ("---");
	throw ("FAIL: at position " + pos.toString () + " " + errorMessage);
    }
}

function transpiler (scnText, grammar, semOperation, semanticsObject, errorMessage) {
    var { parser, cst } = ohm_parse (grammar, scnText, errorMessage);
    var sem = {};
    try {
	if (cst.succeeded ()) {
	    sem = parser.createSemantics ();
	    sem.addOperation (semOperation, semanticsObject);
	    let result = sem (cst)[semOperation]();
	    return result;
	} else {
	    throw ("fail: " + " " + errorMessage);
	}
    } catch (err) {
	throw err;
    }
}


var _scope;

function scopeStack () {
    this._stack = [];
    this.pushNew = function () {this._stack.push ([])};
    this.pop = function () {this._stack.pop ()};
    this._topIndex = function () {return this._stack.length - 1;};
    this._top = function () { return this._stack[this._topIndex ()]; };
    this.scopeAdd = function (key, val) {
	this._top ().push ({key: key, val: val});
    };
    this._lookup = function (key, a) { 
	return a.find (obj => {return obj && obj.key && (obj.key === key)}); };
    this.scopeGet = function (key) {
	var i = this._topIndex ();
	for (; i >= 0 ; i -= 1) {
	    var obj = this._lookup (key, this._stack [i]);
	    if (obj) {
		return obj.val;
	    };
	};
        console.log ('*** scopeGet error ' + key + ' ***');
	console.log (this._stack);
	console.log (key);
	throw "scopeGet internal error - can't find /" + key + "/";
    };
    this.scopeModify = function (key, val) {
	var i = this._topIndex ();
	for (; i >= 0 ; i -= 1) {
	    var obj = this._lookup (key, this._stack [i]);
	    if (obj) {
              obj.val = val;
              return val;
	    };
	};
        console.log ('*** scopeModify error ' + key + ' ***');
	console.log (this._stack);
	console.log (key);
	throw "scopeModify internal error " + key;
    };
}

function scopeAdd (key, val) {
  return _scope.scopeAdd (key, val);
}

function scopeModify (key, val) {
  return _scope.scopeModify (key, val);
}

function scopeGet (key) {
  return _scope.scopeGet (key);
}

function _ruleInit () {
    _scope = new scopeStack ();
}

function traceSpaces () {
    var n = traceDepth;
    while (n > 0) {
	process.stderr.write (" ");
	n -= 1;
    }
    process.stderr.write ('[');
    process.stderr.write (traceDepth.toString ());
    process.stderr.write (']');
}

function _ruleEnter (ruleName) {
    if (argv.tracing) {
	traceDepth += 1;
	traceSpaces ();
	process.stderr.write("enter: ");
	process.stderr.write (ruleName.toString ());
	process.stderr.write ("\n");
    }
    _scope.pushNew ();
}

function _ruleExit (ruleName) {
    if (argv.tracing) {
	traceSpaces ();
	traceDepth -= 1;
	process.stderr.write("exit: "); 
	process.stderr.write (ruleName); 
	process.stderr.write ("\n");
    }
    _scope.pop ();
}


function execTranspiler (source, grammar, semantics, errorMessage) {
    // first pass - transpile osl code to javascript
    try {
	let generatedSCNSemantics = transpiler (semantics, oslGrammar, "_osl", oslSemantics, "in osl specification " + errorMessage);
    _ruleInit();
	try {
	    if (argv.viewgen) {
		console.error("viewgen 2");
		console.error ("[ execTranspiler");
		console.error (generatedSCNSemantics);
		console.error ("execTranspiler ]");
	    }
            let semObject = eval('(' + generatedSCNSemantics + ')');
	    try {
		let tr = transpiler(source, grammar, "_osl", semObject, errorMessage);
		return tr;
	    } catch (err) {
		throw err;
	    }
	}
	catch (err) {
	    throw err;
	}
    } catch (err) {
	throw err;
    }
}

function internal_stranspile (sourceString, grammarFileName, oslFileName, errorMessage) {
    var grammar = fs.readFileSync (grammarFileName, 'utf-8');
    var osl = fs.readFileSync (oslFileName, 'utf-8');
    var returnString = execTranspiler (sourceString, grammar, osl, errorMessage);
    return returnString;
}

function expand (s, grammarFileName, oslFileName, message) {
    var result = internal_stranspile (s, grammarFileName, oslFileName, message);
    return result;
}






function splitOnSeparators (triggerSep, endSep, s) {
    // s = front + beginSep + middle + endSep + rest
    // if there is nothing to expand (i.e. no beginSep), s = front
    // return 3 parts, excluding beginSep and endSep

    var frontMatch = s.match (triggerSep);
    if (frontMatch) {
        // s contains a begin separator : front + beginSep + middle + endSep + rest
        var matchLength = frontMatch [0].length;
    	var indexEndFront = frontMatch.index;   
	var front = s.substring (0, indexEndFront);

	var matchedString = s.substring (indexEndFront, indexEndFront + matchLength);
	var combined = s.substring (indexEndFront + matchLength);
	// combined = middle + endSep + rest
	var middleMatch = combined.match (endSep);

	var middle = matchedString + combined.substring (0, middleMatch.index);
	var rest = combined.substring (middleMatch.index);
	
	return { front, middle, rest };
    } else {
	// there is no middle nor rest (no beginSep)
	front = s;
	middle = '';
	rest = ''
	return { front, middle, rest }; // should be { s, '', '' }, but node.js balks
    }
}

function expandAll (s, triggerRE, endRE, grammarFileName, oslFileName, message) {
    
    var {front, middle, rest} = splitOnSeparators (triggerRE, endRE, s);

    if (middle === '') {
	return front;
    } else {
	var expandedText = expand (middle, grammarFileName, oslFileName, message);
	return front + expandAll (expandedText + rest, triggerRE, endRE, grammarFileName, oslFileName, message);
    }
}

function seml (allchars) {
    var args = process.argv;
    var reTrigger = new RegExp (argv._[0]);
    var reEnd = new RegExp (argv._[1]);
    var grammarFileName = argv._[2];
    var oslFileName = argv._[3];

    if (argv.support) {
	support = require (argv.support);
    }

    if (argv.tracing) {
	traceDepth = 0; // enabled by --tracing on command line
    }

    var expanded = expandAll (allchars, reTrigger, reEnd, grammarFileName, oslFileName, 'parsing input');
    return expanded;
}

function main () {
    var allchars = fs.readFileSync ('/dev/fd/0', 'utf-8');
    var result = seml (allchars);
    emit (result);
}

function debug () {
    var allchars = `
# layer kind
## parameters
  Parent
  Child
## imports
  fb
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
  das_fact(kind,\${Vertex},\${Kind}).
`;
    var result = seml (allchars);
    emit (result);
}

function emit (s) {
    console.log (s);
}

main ();

