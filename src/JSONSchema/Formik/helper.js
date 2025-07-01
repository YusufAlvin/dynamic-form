import { getIn, setIn } from "formik";
import { Parser } from 'expr-eval';

const parser = new Parser();

export const initializeData = (schema) => {
  if (schema.type === "object") {
    const obj = {};
    for (const key in schema.properties) {
      obj[key] = initializeData(schema.properties[key]);
    }
    return obj;
  }

  switch (schema.type) {
    case 'string': return undefined;
    case 'number': return undefined;
    case 'array': return [];
    case 'boolean': return false;
    default: return undefined;
  }
};

export const evaluateValidator = (expression, values) => {
  const pattern = /\{([\w.]+)\}/g;
  const parsedExpr = expression.replace(pattern, (_, field) => {
    const val = getIn(values, field.split('.'));
    if (typeof val === 'string') return `"${val}"`;
    if (val === undefined || val === null) return 'null';
    return val;
  });
  try {
    return parser.evaluate(parsedExpr);
  } catch (err) {
    console.error(`Validation parse error: ${parsedExpr}`, err);
    return false;
  }
}

export const shouldShowField = (fieldSchema, values) => {
  const exprStr = fieldSchema?.showIf;
  if (!exprStr) return true;

  try {
    const expr = exprStr.replace(/\{([\w.]+)\}/g, (_, path) => {
      const val = getIn(values, path);
      return typeof val === "string" ? `"${val}"` : val;
    });

    const show = parser.evaluate(expr);

    return show;
  } catch (e) {
    console.error("Failed to evaluate showIf:", exprStr, e);
    return true;
  }
}

export const validateRules = (schema, keyPath = '', values) => {
  let errors = {};

  if (schema.type === 'object' && schema.properties) {
    Object.entries(schema.properties).forEach(([key, subschema]) => {
      const childPath = keyPath ? `${keyPath}.${key}` : key;
      const newError = validateRules(subschema, childPath, values);
      errors = {...errors, ...newError};
    })
  }

  if (!shouldShowField(schema, values)) return errors;

  if (schema.rules) {
    schema.rules.forEach((rule) => {
      const isNotValid = evaluateValidator(rule.validator, values);
      if (isNotValid) {
        errors = setIn(errors, keyPath, rule.message)
      }
    })
  };

  return errors;  
}