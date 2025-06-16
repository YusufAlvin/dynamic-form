/* eslint-disable react/prop-types */
import { FmlxRadioButton } from "fmlx-common-ui";
import { useField, useFormikContext } from "formik";
import { useMemo } from "react";

const RadioButton = ({id, name, label, path, items}) => {
  const {setFieldValue} = useFormikContext();
  const [field] = useField(name);

  const newItems = items.map((item) => ({
    content: item,
    hint: null,
    disabled: false,
  }));

  const selectedIndex = useMemo(() => {
    return newItems.findIndex((item) => item.content === field.value)
  }, [newItems, field.value])

  const handleChange = ({index}) => {
    setFieldValue(path, newItems[index].content);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <FmlxRadioButton id={id} name={name} items={newItems} selectedIndex={selectedIndex} onChange={handleChange} />
    </div>
  )
}

export default RadioButton;