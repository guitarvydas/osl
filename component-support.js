// stacks
let senderListStack = [];
let receiverListStack = [];
let senderStack = [];
let receiverStack = [];
let pairStack = [];
let namesListStack = [];
let nameStack = [];
let connectionStack = [];
let connectionListStack = [];
let inputsFieldStack = [];
let outputsFieldStack = [];
let stringStack = [];
let syncCodeFieldStack = [];
let nameFieldStack = [];
let idFieldStack = [];
let connectionsFieldStack = [];
let childrenFieldStack = [];
let componentFieldStack = [];
let componentFieldListStack = [];
let componentObjectStack = [];
let componentStack = [];
let componentListStack = [];
let mainStack = [];

let inputNamesStack = [];
let outputNamesStack = [];
let childrenNamesStack = [];



exports.writeComponentList = function () {
    componentListStack.forEach (c => {
	console.error (c);
    });
}


exports.name_newscope = function () {
    nameStack.push ([]);
}
exports.name_delscope = function () {
    nameStack.pop ();
}
exports.name_setfrom_string = function () {
    nameStack.pop ();
    nameStack.push (stringStack.pop ());
    return "";
}

exports.pair_newscope = function () {
    pairStack.push ({});
}
exports.pair_delscope = function () {
    pairStack.pop ();
}
exports.pair_setfield_port_from_name = function () {
    let topPair = pairStack.pop ();
    topPair.port = nameStack.pop ();
    pairStack.push (topPair);
    return "";
}
exports.pair_setfield_component_from_name = function () {
    let topPair = pairStack.pop ();
    topPair.component = nameStack.pop ();
    pairStack.push (topPair);
    return "";
}

exports.sender_newscope = function () {
    senderStack.push ({});
}
exports.sender_delscope = function () {
    senderStack.pop ();
}
exports.sender_setfrom_pair = function () {
    senderStack.pop ();
    senderStack.push (pairStack.pop ());
    return "";
}

exports.senderList_newscope = function () {
    console.error ('sender list newscope');
    senderListStack.push ({});
}
exports.senderList_delscope = function () {
    senderListStack.pop ();
}
exports.senderList_setfrom_sender = function () {
    senderListStack.push (senderStack.pop ());
    return "";
}

exports.receiverList_newscope = function () {
    receiverListStack.push ({});
}
exports.receiverList_delscope = function () {
    receiverListStack.pop ();
}
exports.receiverList_setfrom_receiver = function () {
    receiverListStack.push (receiverStack.pop ());
    return "";
}

exports.receiver_newscope = function () {
    receiverStack.push ({});
}
exports.receiver_delscope = function () {
    receiverStack.pop ();
}
exports.receiver_setfrom_pair = function () {
    receiverStack.pop ();
    receiverStack.push (pairStack.pop ());
    return "";
}

exports.namesList_newscope = function () {
    namesListStack.push ([]);
}
exports.namesList_delscope = function () {
    namesListStack.pop ();
}
exports.namesList_appendfrom_name = function () {
    let top = namesListStack.pop ();
    while (0 < nameStack.length) {
	top.push (nameStack.pop ());
    }
    namesListStack.push (top);
    return "";
}

exports.name_newscope = function () {
    nameStack.push ('');
}
exports.name_delscope = function () {
    nameStack.pop ();
}

exports.connection_newscope = function () {
    connectionStack.push ({senders:{}, receivers:{}});
}
exports.connection_delscope = function () {
    connectionStack.pop ();
}
exports.connection_setfield_sender_from_senderList = function () {
    let top = connectionStack.pop ();
    top.senders = senderListStack.pop ();
    connectionStack.push (top);
    return "";
}
exports.connection_setfield_receiver_from_receiverList = function () {
    let top = connectionStack.pop ();
    top.receivers = receiverListStack.pop ();
    connectionStack.push (top);
    return "";
}
exports.connectionList_newscope = function () {
    connectionListStack.push ([]);
}
exports.connectionList_delscope = function () {
    connectionListStack.pop ();
}
exports.connectionList_setfrom_connection = function () {
    let top = connectionListStack.pop ();
    while (connectionStack.length > 0) {
	top.push (connectionStack.pop ());
    }
    connectionListStack.push (top);
    console.error (connectionListStack);
    return "";
}

exports.inputsField_newscope = function () {
    inputsFieldStack.push ([]);
}
exports.inputsField_delscope = function () {
    inputsFieldStack.pop ();
}
exports.inputsField_setfrom_inputNames = function () {
    inputsFieldStack.push (inputNamesStack.pop ());
    return "";
}

exports.outputsField_newscope = function () {
    outputsFieldStack.push ([]);
}
exports.outputsField_delscope = function () {
    outputsFieldStack.pop ();
}
exports.outputsField_setfrom_outputNames = function () {
    outputsFieldStack.push (outputNamesStack.pop ());
    return "";
}

exports.string_newscope = function () {
    stringStack.push ("");
}
exports.string_delscope = function () {
    stringStack.pop ();
}
exports.string_set = function (s) {
    stringStack.pop ();
    stringStack.push (s);
    return "";
}

exports.syncCodeField_newscope = function () {
    syncCodeFieldStack.push ({});
}
exports.syncCodeField_delscope = function () {
    syncCodeFieldStack.pop ();
}
exports.syncCodeField_setfrom_string = function () {
    syncCodeFieldStack.pop ();
    syncCodeFieldStack.push (stringStack.pop ());
    return "";
}

exports.nameField_newscope = function () {
    nameFieldStack.push ("");
}
exports.nameField_delscope  = function () {
    nameFieldStack.pop ();
}
exports.nameField_setfrom_name  = function () {
    nameFieldStack.pop ();
    nameFieldStack.push (nameStack.pop ());
    return "";
}

exports.idField_newscope = function () {
    idFieldStack.push ("");
}
exports.idField_delscope  = function() {
    idFieldStack.pop ();
}
exports.idField_setfrom_name  = function() {
    idFieldStack.pop ();
    idFieldStack.push (nameStack.pop ());
    return "";
}

exports.connectionsField_newscope = function () {
    connectionsFieldStack.push ({});
}
exports.connectionsField_delscope = function () {
    connectionsFieldStack.pop ();
}
exports.connectionsField_setfrom_connectionList = function () {
    connectionsFieldStack.pop ();
    connectionsFieldStack.push (connectionListStack.pop ());
    return "";
}


exports.childrenField_newscope = function () {
    childrenFieldStack.push ([]);
}
exports.childrenField_delscope = function () {
    childrenFieldStack.pop ();
}
exports.childrenField_setfrom_childrenNames = function () {
    childrenFieldStack.pop ();
    childrenFieldStack.push (childrenNamesStack.pop ());
    return "";
}


exports.componentObject_newscope = function () {
    componentObjectStack.push ({});
}
exports.componentObject_delscope = function () {
    componentObjectStack.pop ();
}
exports.componentObject_setfield_children_from_childrenField = function () {
    var top = componentObjectStack.pop ();
    top.children = childrenFieldStack.pop ();
    componentObjectStack.push (top);
    return "";
}
exports.componentObject_setfield_connections_from_connectionsField = function () {
    var top = componentObjectStack.pop ();
    top.connections = connectionsFieldStack.pop ();
    componentObjectStack.push (top);
    return "";
}
exports.componentObject_setfield_id_from_idField = function () {
    var top = componentObjectStack.pop ();
    top.id = idFieldStack.pop ();
    componentObjectStack.push (top);
    return "";
}
exports.componentObject_setfield_inputs_from_inputsField = function () {
    var top = componentObjectStack.pop ();
    top.inputs = inputsFieldStack.pop ();
    componentObjectStack.push (top);
    return "";
}
exports.componentObject_setfield_outputs_from_outputsField = function () {
    var top = componentObjectStack.pop ();
    top.outputs = outputsFieldStack.pop ();
    componentObjectStack.push (top);
    return "";
}
exports.componentObject_setfield_name_from_nameField = function () {
    var top = componentObjectStack.pop ();
    top.name = nameFieldStack.pop ();
    componentObjectStack.push (top);
    return "";
}
exports.componentObject_setfield_syncCode_from_syncCodeField = function () {
    var top = componentObjectStack.pop ();
    top.syncCode = syncCodeFieldStack.pop ();
    componentObjectStack.push (top);
    return "";
}



exports.component_newscope = function () {
    componentStack.push ({});
}
exports.component_delscope = function () {
    componentStack.pop ();
}
exports.component_setfrom_componentObject = function () {
    componentStack.pop ();
    componentStack.push (componentObjectStack.pop ());
    return "";
}

exports.componentList_newscope = function () {
    componentListStack.push ([]);
}
exports.componentList_delscope = function () {
    componentListStack.pop ();
}
exports.componentList_setfrom_component = function () {
    var top = componentListStack.pop ();
    while (componentStack.length > 0) {
	top.push (componentStack.pop ());
    }
    componentListStack.push (top);
    return "";
}

exports.mainStack_newscope = function () {
    mainStack.push ({});
}
exports.mainStack_delscope = function () {
    mainStack.pop ();
}
exports.mainStack_setfrom_componentList = function () {
    mainStack.pop ();
    mainStack.push (componentList.pop ());
    return "";
}

exports.inputNames_newscope = function () {
    inputNamesStack.push ([]);
}
exports.inputNames_delscope = function () {
    inputNamesStack.pop ();
}
exports.inputNames_setfrom_namesList = function () {
    inputNamesStack.pop ();
    inputNamesStack.push (namesListStack.pop ());
    return "";
}

exports.outputNames_newscope = function () {
    outputNamesStack.push ([]);
}
exports.outputNames_delscope = function () {
    outputNamesStack.pop ();
}
exports.outputNames_setfrom_namesList = function () {
    outputNamesStack.pop ();
    outputNamesStack.push (namesListStack.pop ());
    return "";
}

exports.childrenNames_newscope = function () {
    childrenNamesStack.push ({});
}
exports.childrenNames_delscope = function () {
    childrenNamesStack.pop ();
}
exports.childrenNames_setfrom_namesList = function () {
    childrenNamesStack.pop ();
    childrenNamesStack.push (namesListStack.pop ());
    return "";
}


// exports.debug = function () {
//     console.error (nameStack);
//     return "";
// }
