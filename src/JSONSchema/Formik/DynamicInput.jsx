import { Fragment } from "react";
import TextboxNumber from "./TextboxNumber";
import TextboxString from "./TextboxString";
import Dropdown from "./Dropdown";
import Switch from "./Switch";
import RadioButton from "./RadioButton";
import ComboBox from "./ComboBox";
import DatePicker from "./DatePicker";
import { shouldShowField } from "./helper";

const DynamicInput = ({schema, values}) => {
  const renderInput = (schema, path) => {
    const newPath = path.join('.');
    const uiWidget = schema['ui:widget'];

    switch (schema.type) {
      case 'string': {
        if (uiWidget === 'dropdown') {
          return <Dropdown id={schema.name} label={schema.label} name={schema.name} path={newPath} items={schema.enum} />;
        }

        if (uiWidget === 'radio') {
          return <RadioButton id={schema.name} label={schema.label} name={schema.name} path={newPath} items={schema.enum} />
        }

        if (schema.format === 'date') {
          return <DatePicker id={schema.name} label={schema.label} name={schema.name} />;
        }

        return <TextboxString id={schema.name} label={schema.label} name={schema.name} />;
      }
      case 'number': {
        return <TextboxNumber id={schema.name} label={schema.label} name={schema.name} />;
      }
      case 'boolean': {
        return <Switch id={schema.name} label={schema.label} name={schema.name} path={newPath} />
      }
      case 'array': {
        return <ComboBox id={schema.name} label={schema.label} name={schema.name} path={newPath} items={schema.items.enum} />
      }
      default: return <></>
    } 
  }

  const renderInputs = (schema, path = [], values) => {
    if (schema.type === "object") {
      return (
        <>
          {schema?.label && <h3>{schema.label}</h3>}
          {Object.entries(schema.properties).map(([key, subschema]) => {
            const show = shouldShowField(subschema, values);
            if (!show) return null;

            return (
            <Fragment key={key}>
              {renderInputs(subschema, [...path, key])}
            </Fragment>
          )})}
        </>
      );
    }

    return renderInput(schema, path);
  };

  return renderInputs(schema, [], values);
}

export default DynamicInput