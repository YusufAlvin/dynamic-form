/* eslint-disable react/prop-types */
import { FmlxComboBox } from "fmlx-common-ui";
import { useField, useFormikContext } from "formik";
import { useMemo } from "react";

const ComboBox = ({name, label, items, path}) => {
  const {setFieldValue} = useFormikContext();
  const [field, meta] = useField(name);
  const error = meta?.error;

  const newItem = useMemo(() => items.map((itm) => ({
    id: itm,
    text: itm,
    group: ''
  })), [items])

  const selectedItems = useMemo(() => {
    const arrItems = [];
    newItem.forEach((item) => {
      const isValueArray = Array.isArray(field.value);

      if (isValueArray) {
        if (field.value.includes(item.id)) {
          arrItems.push(item)
        }
      }
      
    })
    return arrItems;
  }, [newItem, field.value])

  const handleChange = (item) => {
    setFieldValue(path, item.map((itm) => itm.id));
  };

  const handleDeleteChip = (item) => {
    setFieldValue(path, field.value.filter((itm) => itm.id !== item));
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <FmlxComboBox name={name} multiple error={!!error} selectedMultipleItem={selectedItems} items={newItem} onChange={handleChange} onDeleteChip={handleDeleteChip} />
      {error && (<span style={{fontSize: 13, color: 'red'}}>{error}</span>)}
    </div>
  )
}

export default ComboBox;