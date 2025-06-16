import { Fragment } from "react";
import TextboxText from "./TextboxText";
import Dropdown from "./Dropdown";
import Switch from "./Switch";
import TextboxNumber from "./TextboxNumber";

const DynamicInput = ({schema}) => {
  const renderInput = (schema, path, required = []) => {
    const isRequired = required.includes(path.join('.'));

    switch (schema.type) {
      case 'string': {
        return <TextboxText schema={schema} name={path} required={isRequired} />;
      }
      case 'number': {
        return <TextboxNumber schema={schema} name={path} required={isRequired} />;
      }
      case 'enum': {
        return <Dropdown schema={schema} name={path} options={schema.options} required={isRequired} />;
      }
      case 'boolean': {
        return <Switch schema={schema} name={path} required={isRequired} />;
      }
      default: return <></>
    }
  }

  const renderInputs = (schema, path = [], required = []) => {
    if (schema.type === "object") {
      return (
        Object.entries(schema.properties).map(([key, subschema]) => (
          <Fragment key={key}>
            {renderInputs(subschema, [...path, key], required)}
          </Fragment>
        ))
      );
    }
    
    return renderInput(schema, path, required);
  }

  return renderInputs(schema, [], schema.required);
}

export default DynamicInput