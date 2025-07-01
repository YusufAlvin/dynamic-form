import { Form, Formik as FormikLib, setIn } from "formik";
import schema from '../schema.json';
import DynamicInput from "./DynamicInput";
import { FmlxButton } from "fmlx-common-ui";
import Ajv from "ajv";
import { initializeData, validateRules } from "./helper";
import { useMemo } from "react";

const ajv = new Ajv({ allErrors: true, strict: false });
const validateSchema = ajv.compile(schema);

const Formik = () => {
  const initialValues = useMemo(() => initializeData(schema), []);
  const validate = (values) => {
    let errors = {};
    let errorMesage = '';

    const isValid = validateSchema(values);
    
    if (!isValid) {
      for (const err of validateSchema.errors) {
        let path = err.instancePath.slice(1).replace(/\//g, '.');
        const isRequired = err.keyword === 'required';

        if (isRequired) {
          errorMesage = 'The field is required';
        } else {
          errorMesage = err.message;
        }

        if (isRequired && err.params?.missingProperty) {
          path = path ? `${path}.${err.params.missingProperty}` : err.params.missingProperty;
        }

        errors = setIn(errors, path, errorMesage)
      }
      return errors;
    }

    errors = validateRules(schema, '', values);


    return errors;
  }

  return (
    <FormikLib initialValues={initialValues} validate={validate} validateOnChange={false} validateOnBlur={false}>
      {(formik) => (
        <Form style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 600 }} onSubmit={formik.handleSubmit}>
          <DynamicInput schema={schema} required={schema.required} values={formik.values} />
          <FmlxButton buttonType='submit' label="Submit" />
        </Form>
      )}
    </FormikLib>
  )
};

export default Formik