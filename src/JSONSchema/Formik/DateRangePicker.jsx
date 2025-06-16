/* eslint-disable react/prop-types */
import { FmlxDateRangePicker } from "fmlx-common-ui";
import { useField } from "formik";

const DateRangePicker = ({id, label, name}) => {
  const [field] = useField(name);

  const handleChange = (event) => {
    field.onChange(event);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <FmlxDateRangePicker id={id} name={name} value={field.value} onChange={handleChange} />
    </div>
  )
}

export default DateRangePicker;