/* eslint-disable react/prop-types */
import { FmlxTextBox } from "fmlx-common-ui";
import { useField } from "formik"

const TextboxNumber = ({id, label, name}) => {
  const [field, meta] = useField(name);
  const error = meta?.error;

  const handleChange = ({event}) => {
    field.onChange(event);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <FmlxTextBox mode='number' name={name} id={id} error={!!error} value={field.value} onChange={handleChange} />
      {error && (<span style={{fontSize: 13, color: 'red'}}>{error}</span>)}
    </div>
  )
}

export default TextboxNumber;