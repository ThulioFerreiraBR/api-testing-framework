const { Validator } = require('jsonschema');
const v = new Validator();

function validateSchema(data, schema) {
    const result = v.validate(data, schema); 
    
   // If the API contract is broken, we format the validation errors
   // and throw an exception to fail the test in Jest
   if (!result.valid) {
        const errors = result.errors
            .map(err => `${err.property} ${err.message}`)
            .join('\n');
        throw new Error(`Schema validation failed:\n${errors}`);
    }
    return result;
}

module.exports = { validateSchema };