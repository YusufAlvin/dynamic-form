import { Fragment } from "react";
import TextboxNumber from "./TextboxNumber";
import TextboxString from "./TextboxString";
import Dropdown from "./Dropdown";
import Switch from "./Switch";
import RadioButton from "./RadioButton";
import ComboBox from "./ComboBox";
import DatePicker from "./DatePicker";
import { shouldShowField } from "./helper";

const componentMap = {
  string: {
    default: TextboxString,
    dropdown: Dropdown,
    radio: RadioButton,
    date: DatePicker,
  },
  number: {
    default: TextboxNumber,
  },
  boolean: {
    default: Switch,
  },
  array: {
    default: ComboBox,
  },
};

const renderInput = (schema, path) => {
  const newPath = path.join('.');
  const { type, 'ui:widget': uiWidget, format } = schema;

  const componentType = componentMap[type];
  if (!componentType) return null;

  const Component =
    (format && componentType[format]) ||
    (uiWidget && componentType[uiWidget]) ||
    componentType.default;

  if (!Component) return null;

  const props = {
    id: newPath,
    name: newPath,
    label: schema.label,
    path: newPath,
  };

  if (type === 'array') {
    props.items = schema.items.enum;
  } else if (schema.enum) {
    props.items = schema.enum;
  }

  return <Component {...props} />;
};

const renderInputs = (schema, path = [], values) => {
  if (schema.type === "object") {
    return (
      <>
        {schema?.label && <strong>{schema.label}</strong>}
        {Object.entries(schema.properties).map(([key, subschema]) => {
          const show = shouldShowField(subschema, values);
          if (!show) return null;

          return (
            <Fragment key={key}>
              {renderInputs(subschema, [...path, key], values)}
            </Fragment>
          );
        })}
      </>
    );
  }

  return renderInput(schema, path);
};

const DynamicInput = ({ schema, values }) => {
  return renderInputs(schema, [], values);
};

export default DynamicInput