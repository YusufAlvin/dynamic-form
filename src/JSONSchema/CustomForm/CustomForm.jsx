/* eslint-disable react/prop-types */
import { FmlxTextBox } from 'fmlx-common-ui';
import { useState, Fragment } from 'react';
import styles from './DynamicInput.module.scss';

const initializeData = (schema) => {
  if (schema.type === "object") {
    const obj = {};
    for (const key in schema.properties) {
      obj[key] = initializeData(schema.properties[key]);
    }
    return obj;
  } else {
    return "";
  }
};

const CustomForm = ({schema}) => {
  const [state, setState] = useState(() => initializeData(schema));

  const renderTextBox = (schema, data, path) => {
    let inputType = "text";
    if (schema.type === "number") inputType = "number";

    const handleChange = ({value}) => {
      setState((prevData) => {
        let newData = { ...prevData };
        const lastKey = path[path.length - 1];
        const deepObj = path.slice(0, -1).reduce((acc, k) => {
          return acc[k]
        }, newData);
        deepObj[lastKey] = value;
        return newData;
      });
    };

    return (
      <div id={schema.id} key={schema.id} className={styles.inputContainer}>
        <span>{schema.label}</span>
        <FmlxTextBox mode={inputType} value={data === undefined ? '' : data} onChange={handleChange} />
      </div>
    );
  }

  const renderInput = (schema, data, path) => {
    switch (schema.type) {
      case 'string':
      case 'number': {
        return renderTextBox(schema, data, path);
      }
      default: return <></>
    }
  }

  const renderInputs = (schema, data, path = []) => {
    if (schema.type === "object") {
      return (
        Object.entries(schema.properties).map(([key, subschema]) => (
          <Fragment key={key}>
            {renderInputs(subschema, data[key], [...path, key])}
          </Fragment>
        ))
      );
    }

    return renderInput(schema, data, path);
  };

  const handleClick = () => {
    console.log(state)
  }

  return (
    <div className={styles.container}>
      {renderInputs(schema, state)}
      <button onClick={handleClick}>Clcik</button>
    </div>
  )
}

export default CustomForm