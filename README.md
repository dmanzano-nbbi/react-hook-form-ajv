# React Hook Form Demo with AJV

npm install

npm start

Note: There may be an issue that causes a loading error. For now, this can be solved by removing the two mentions of the field 'oneOf' in json-schema.d.ts

Possible solution to the loading error is to update the following to include JSONSchemaType: 
- import Ajv, { JSONSchemaType } from "ajv";
- const schema: JSONSchemaType<IFormInput> 