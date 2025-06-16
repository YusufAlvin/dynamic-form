/* eslint-disable react/prop-types */
import { FmlxSwitch } from "fmlx-common-ui";
import { useField, useFormikContext } from "formik";

const Switch = ({id, name, label, path}) => {
  const {setFieldValue} = useFormikContext();
  const [field] = useField(name);

  const handleChange = (value) => {
    setFieldValue(path, value);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <FmlxSwitch id={id} name={name} checked={field.value} onChange={handleChange} />
    </div>
  )
}

export default Switch;