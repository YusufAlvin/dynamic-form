/* eslint-disable react/prop-types */
import { FmlxTextBox } from "fmlx-common-ui";
import { useField } from "uniforms";

const TextboxNumber = (props) => {
  const [fieldProps] = useField(props.name, props);
  const {id} = props.schema;

  const handleChange = ({value}) => {
    fieldProps.onChange(value, props.name);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <span>{fieldProps.field.label}</span>
      <FmlxTextBox id={id} mode='number' minValue={fieldProps.min} maxValue={fieldProps.max} value={fieldProps.value} onChange={handleChange}/>
    </div>
  );
}

export default TextboxNumber