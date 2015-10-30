import validator, {
  isEmail,
  isNull,
  isNumeric,
  isInt
} from "validator"

function validationTruthChecker(method, rules) {
  var result = method === false ? false : true;
  var error = null;

  if (result === false) {
    switch(rules) {
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

function ruleChecker(value, rule) {
  switch(rule) {
    case "required":
      return validationTruthChecker(!isNull(value), rule);
    break;

    case "number":
      return validationTruthChecker(isNumeric(value), rule);
    break;

    case "percentage":
      return validationTruthChecker(isInt(value, { min: 0, max:100 }), rule);
    break;

    default:
      return defaults;
  }
}

export function inputsValidator(value, rules) {

  var defaults = { result: true, error: null };

  if (Array.isArray(rules)) {
    return rules.map(rule => {
      switch(rule) {
        case "required":
          return validationTruthChecker(!isNull(value), rule);
        break;

        case "number":
          return validationTruthChecker(isNumeric(value), rule);
        break;

        case "percentage":
          return validationTruthChecker(isInt(value, { min: 0, max:100 }), rule);
        break;

        default:
          return defaults;
      }
    })
  } else if (typeof rules === "string") {
    switch(rules) {
      case "required":
        return validationTruthChecker(!isNull(value), rules)
      break;

      case "number":
        return validationTruthChecker(isNumeric(value), rules)
      break;

      case "percentage":
        return validationTruthChecker(isInt(value, { min: 0, max:100 }), rules)
      break;

      default:
        return defaults
    }
  }
}
