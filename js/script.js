function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
    pos = 0,
    step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }     
    
    return n;
}

function cleanUpCode(json) {
                
    var traits = json.traits;
    var traitIDArray = [];
                
    for (var x = 0; x < traits.length; x++) {
        traitIDArray.push(traits[x].HSTraitIDKey);
    }
                
    var eventParameters = json.eventParameters;
    var eventParametersIDArray = [];
                
    for (var x = 0; x < eventParameters.length; x++) {
        eventParametersIDArray.push(eventParameters[x].id);
    }
                
    var jsonString = JSON.stringify(json);
    
    for (var x = 0; x < traitIDArray.length; x++) {
                    
        var includedTraitIDCount = occurrences(jsonString, traitIDArray[x]);
                    
        if (includedTraitIDCount == 1) {
                        
            var found = false;
            var i = 0;
                        
            do {
                if (json.traits[i].HSTraitIDKey == traitIDArray[x]) {
                    json.traits.splice(i, 1);
                    found = true;
                } else {
                    i += 1;
                }
            }
            while (!found);
        }

    }

                
    for (var x = 0; x < eventParametersIDArray.length; x++) {
                    
        var includedEventParameterIDCount = occurrences(jsonString, eventParametersIDArray[x]);
                    
        if (includedEventParameterIDCount == 1) {
                        
            var found = false;
            var i = 0;
                        
            do {
                if (json.eventParameters[i].id == eventParametersIDArray[x]) {
                    json.eventParameters.splice(i, 1);
                    found = true;
                } else {
                    i += 1;
                }
            }
                while (!found);
                        
        }
    }
                
    console.log("Event parameters before: " + eventParametersIDArray.length); 
    console.log("Event parameters after: " + json.eventParameters.length);
                
    console.log("Traits before: " + traitIDArray.length);
    console.log("Traits after: " + json.traits.length);
                
    document.getElementById("result").innerHTML = JSON.stringify(json);   
                
}