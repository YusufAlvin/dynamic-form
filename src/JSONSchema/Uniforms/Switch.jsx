/* eslint-disable react/prop-types */
import { FmlxSwitch } from "fmlx-common-ui";
import { useField } from "uniforms";

const Switch = (props) => {
  const [fieldProps] = useField(props.name, props);

  const handleChange = (checked) => {
    fieldProps.onChange(checked, props.name);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <span>{fieldProps.field.label}</span>
      <FmlxSwitch checked={fieldProps.value} onChange={handleChange} />
    </div>
  )
}

export default Switch;