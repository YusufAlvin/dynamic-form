/* eslint-disable react/prop-types */
import { FmlxTextBox } from "fmlx-common-ui";
import get from "lodash/get";
import { useField } from "uniforms";

const TextboxText = (props) => {
  const [fieldProps, context] = useField(props.name, props);
  const {id, validation, minLength} = props.schema;
  const error = get(context.error, props.name);

  console.log('TextboxText', {context, fieldProps})

  const validate = (value) => {
    if (validation && value) {
      const a = new Function(props.name, `return ${validation}`)(value)
      return a;
    }
    return true;
  }

  const handleChange = ({value}) => {
    let isValid = validate(value);

    if (isValid) {
      fieldProps.onChange(value, props.name);
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <span>{fieldProps.field.label}{props.required && <span style={{color: 'red'}}>*</span>}</span>
      <FmlxTextBox id={id} mode='text' error={fieldProps.error} value={fieldProps.value} minLength={minLength} onChange={handleChange}/>
      {error && <span style={{fontSize: 12, color: 'red'}}>{error}</span>}
    </div>
  );
}

export default TextboxText