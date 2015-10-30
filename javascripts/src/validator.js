import validator, {
  isEmail,
  isNull,
  isNumeric,
  isInt
} from "validator"

function validationTruthChecker(method, rule) {
  var result = method === false ? false : true;
  var error = null;

  if (result === false) {
    switch(rule) {
      case "required":
        error = "You cannot leave this blank";
        return {result, error};
      case "number":
        error = "Number only";
        return {result, error};
      case "percentage":
        error = "Insert number between 0 and 100";
        return {result, error};
      default:
        error = ""
        return {result, error};
    }
  } else {
    return {result, error};
  }
}

export function inputsValidator(value, rule) {
  switch(rule) {
    case "required":
      return validationTruthChecker(!isNull(value), rule)
    break;

    case "number":
      return validationTruthChecker(isNumeric(value), rule)
    break;

    case "percentage":
      return validationTruthChecker(isInt(value, { min: 0, max:100 }), rule)
    break;

    default:
      return "valid"

  }
}
