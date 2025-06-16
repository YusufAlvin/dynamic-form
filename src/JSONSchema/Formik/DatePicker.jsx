/* eslint-disable react/prop-types */
import { FmlxDatePicker } from "fmlx-common-ui";
import { useField } from "formik";

const DatePicker = ({id, label, name}) => {
  const [field, meta] = useField(name);
  const error = meta?.error;

  const handleChange = (event) => {
    field.onChange(event);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <FmlxDatePicker id={id} name={name} error={!!error} value={field.value} onChange={handleChange} />
      {error && (<span style={{fontSize: 13, color: 'red'}}>{error}</span>)}
    </div>
  )
}

export default DatePicker;