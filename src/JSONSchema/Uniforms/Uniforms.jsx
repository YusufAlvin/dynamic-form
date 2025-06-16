import { AutoForm } from 'uniforms-unstyled';
import JSONSchema from '../schema.json';
import JSONSchemaBridge from 'uniforms-bridge-json-schema';
import DynamicInput from './DynamicInput';
import get from 'lodash/get';
import set from 'lodash/set';

const bridge = new JSONSchemaBridge({
  schema: JSONSchema,
  validator: (d) => {console.log(d)},
});

const Uniforms = () => {
  const handleSubmit = (data) => {
    console.log('handleSubmit', {data})
  };

  const handleValidate = (data) => {
    let error = {};
    JSONSchema.required.forEach((key) => {
      const value = get(data, key);
      if(!value) {
        error = set(error, key, 'Field is required')
      }
    })
    return error;
  }

  return (
    <AutoForm schema={bridge} onValidate={handleValidate} onSubmit={handleSubmit} validate='onSubmit'>
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: 300}}>
        <DynamicInput schema={JSONSchema} />
        <input type='submit' name='submit' />
      </div>
    </AutoForm>
  )
};

export default Uniforms