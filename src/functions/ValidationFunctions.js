const BigNumber = require('bignumber.js');

export function validateString(value){
    return value
}

export function validatePositiveInteger(value){
    try{
        let posIntValue = parseInt(value);
        if(posIntValue >= 0) return [posIntValue, true];
        else return [0, false]
    }
    catch(e){
        console.error("Error checking positive integer validity")
        return [0, false]
    }
}

export function validatePositiveLargeInteger(value){
    try{
        let posIntValue = new BigNumber(value);
        if(posIntValue.isGreaterThanOrEqualTo(0) && 
            posIntValue.dp() == 0) return [posIntValue, true];
        return [0, false]
    }
    catch(e){
        console.error("Error checking positive large interger validity")
        return [0, false]
    }
}

export function validatePositiveFloat(value){
    try{
        let posFloatValue = new BigNumber(value);
        if(posFloatValue.isGreaterThanOrEqualTo(0)) return [posFloatValue, true];
        return [0, false]
    }
    catch(e){
        console.error("Error checking positive float validity")
        return [0, false]
    }
}

export function validateBoolean(value){
    try{
        if(typeof value == "boolean") return true;
        return false
    }
    catch(e){
        console.error("Error checking boolean validity")
        return false
    }
}

export function validateAddress(value){
    try{
        let regEx = /^0x[0-9a-zA-Z]+$/;
        if(value.length == 42 && 
            value.match(regEx))return true
        return false
    }
    catch(e){
        console.error("Error checking address validity")
        return false
    }
}

export function validateBytes(value){
    try{
        let regEx = /^0x[0-9a-zA-Z]+$/;
        if(value.value.match(regEx))return true
        return false
    }
    catch(e){
        console.error("Error checking bytes validity")
        return false
    }
}

export function validateObject(obj){
    try{
        for(var key in obj) {
            if(!obj[key]) return false;
        }
        return true;
    }
    catch(e){
        console.error("Error checking object validity")
        return false
    }
}


export function FormatErrorMessage(values, labels){
    let ErrorFormatMessage = "";
    for(let i=0; i < values.length; i++){
        ErrorFormatMessage = ErrorFormatMessage + ((false == values[i])?(labels[i] + " format is wrong. \n"):"");
    }
    window.alert(ErrorFormatMessage)
}