import validator, {
  isEmail,
  isNull,
  isNumeric,
  isInt
} from "validator"

function errorHandler(method, rules) {
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
        error = null
        return {result, error};
    }
  } else {
    return {result, error};
  }
}

function checker(value, rule) {
  var defaults = { result: true, error: null };
  switch(rule) {
    case "required":
      return errorHandler(!isNull(value), rule);
    break;

    case "number":
      return errorHandler(isNumeric(value), rule);
    break;

    case "percentage":
      return errorHandler(isInt(value, { min: 0, max: 100 }), rule);
    break;

    default:
      return defaults;
  }
}

export function inputsValidator(value, rules) {

  var defaults = { result: true, error: null };

  if (Array.isArray(rules)) {
    return rules.map(rule => {
      return checker(value, rule);
    })
  } else if (typeof rules === "string") {
    return checker(value, rules);
  }
}
