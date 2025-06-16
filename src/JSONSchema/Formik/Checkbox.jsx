/* eslint-disable react/prop-types */
import { FmlxCheckBox } from "fmlx-common-ui";
import { useField, useFormikContext } from "formik";

const Checkbox = ({id, name, label, path}) => {
  const {setFieldValue} = useFormikContext();
  const [field] = useField(name);

  const handleChange = (event) => {
    setFieldValue(path, event.target.checked);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <FmlxCheckBox id={id} name={name} checked={field.value} onChange={handleChange} />
    </div>
  )
}

export default Checkbox;