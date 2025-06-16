import { FmlxDropdown } from "fmlx-common-ui";
import { useMemo } from "react";
import { useField } from "uniforms";

/* eslint-disable react/prop-types */
const Dropdown = (props) => {
  const [fieldProps] = useField(props.name, props);
  const {id, options} = props.schema;

  const items = useMemo(() => options.map((opt) => ({
    id: opt,
    text: opt,
    group: '',
  })), [options])

  const handleChange = (itemId) => {
    fieldProps.onChange(itemId, props.name);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <span>{fieldProps.field.label}</span>
      <FmlxDropdown id={id} selectedItem={fieldProps.value} items={items} onChange={handleChange} />
    </div>
  );
};

export default Dropdown;