import rules from "./rules";
import regex from "./regex";

const validator = (value , validation) =>{
    let validtionResults = []
    for (const validator of validation){
        if (validator.value === rules.requiredValue){
            value.trim().length === 0 && validtionResults.push(false)
        }

        if (validator.value === rules.minValue){
            value.trim().length < validator.min && validtionResults.push(false)
        }

        if (validator.value === rules.maxValue){
            value.trim().length > validator.max && validtionResults.push(false)
        }

        if (validator.value === rules.emailValue){
            !regex.emailRegex(value) && validtionResults.push(false)
        }
    }

    if (validtionResults.length){
        return false
    }else {
        return true
    }
}
export default validator