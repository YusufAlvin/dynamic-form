/* eslint-disable react/prop-types */
import { FmlxTextBox } from "fmlx-common-ui";
import { useField } from "formik";

const TextboxString = ({id, label, name}) => {
  const [field, meta] = useField(name);
  const error = meta?.error;

  const handleChange = ({event}) => {
    field.onChange(event);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <FmlxTextBox id={id} name={name} error={!!error} value={field.value} onChange={handleChange} />
      {error && (<span style={{fontSize: 13, color: 'red'}}>{error}</span>)}
    </div>
  )
}

export default TextboxString;