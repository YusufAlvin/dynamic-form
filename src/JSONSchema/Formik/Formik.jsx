import { Form, Formik as FormikLib} from "formik";
import schema from '../schema.json';
import DynamicInput from "./DynamicInput";
import { FmlxButton } from "fmlx-common-ui";
import Ajv from "ajv";
import { initializeData, validateRules } from "./helper";

const ajv = new Ajv({ allErrors: true, strict: false });
const validateSchema = ajv.compile(schema);

const Formik = () => {
  const validate = (values) => {
    let errors = {};

    const isValid = validateSchema(values);
    
    if (!isValid) {
      for (const err of validateSchema.errors) {
        console.log(err)
        const field = err.instancePath.replace('/', '');
        errors[field] = err.message;
      }
      return errors;
    }

    errors = validateRules(schema, '', values);

    console.log('validate', errors)

    return errors;
  }

  return (
    <FormikLib initialValues={initializeData(schema)} validate={validate} validateOnChange={false} validateOnBlur={false}>
      {(formik) => (
        <Form style={{display: 'flex', flexDirection: 'column', gap: 16, width: 600}} onSubmit={formik.handleSubmit}>
          <DynamicInput schema={schema} required={schema.required} values={formik.values} />
          <FmlxButton buttonType='submit' label="Submit" />
        </Form>
      )}
    </FormikLib>
  )
};

export default Formik