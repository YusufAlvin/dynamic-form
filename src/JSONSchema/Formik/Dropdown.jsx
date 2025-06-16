/* eslint-disable react/prop-types */
import { FmlxDropdown } from "fmlx-common-ui";
import { useField, useFormikContext } from "formik";
import { useMemo } from "react";

const Dropdown = ({name, label, items, path}) => {
  const {setFieldValue} = useFormikContext();
  const [field] = useField(name);

  const newItem = useMemo(() => items.map((itm) => ({
    id: itm,
    text: itm,
    group: ''
  })), [items])

  const handleChange = (id) => {
    setFieldValue(path, id);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <FmlxDropdown name={name} selectedItem={field.value} items={newItem} onChange={handleChange} />
    </div>
  )
}

export default Dropdown;