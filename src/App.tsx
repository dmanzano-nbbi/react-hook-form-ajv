import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Ajv, { JSONSchemaType } from "ajv";
import addErrors from "ajv-errors";
import { ajvResolver } from "@hookform/resolvers/ajv";
// import { ajvResolver } from "./ajv";

const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

const schema: JSONSchemaType<IFormInput> = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
      maxLength: 20,
      errorMessage: {
        type: "First name must be a string.",
        maxLength: "First name cannot exceed 20 characters.",
        minLength: 'First name is required.',
      },
    },
    lastName: {
      type: "string",
      minLength: 1,
      pattern: "^[A-Za-z]+$",
      errorMessage: {
        minLength: "Last name is required.",
        type: "Last name must be a string.",
        pattern: "Last name must only contain letters.",
      },
    },
    age: {
      type: "number",
      minimum: 18,
      maximum: 99,
      errorMessage: {
        type: "Age is required.",
        minimum: "Age must be at least 18.",
        maximum: "Age must be less than or equal to 99.",
      },
    },
    email: {
      type: "string",
      minLength: 1,
      pattern: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
      errorMessage: {
        minLength: "Email address is required.",
        type: "Email address is required.",
        pattern: "Email address must be a valid format.",
      },
    }
  },
  required: ["firstName", "lastName", "age", "email"],
  additionalProperties: false,
};

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

export default function App() {
  const initialFormState = {
    firstName: undefined,
    lastName: undefined,
    age: undefined,
    email: undefined,
  } 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: initialFormState,
    resolver: ajvResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='firstName'>First Name</label>
      <input id='firstName' aria-invalid={errors.firstName ? "true" : "false"} {...register("firstName")} />
      {errors.firstName && (<p>{errors.firstName.message}</p>)}
      <label htmlFor= 'lastName'>Last Name</label>
      <input id='lastName' {...register("lastName")} />
      {errors.lastName && <p>{errors.lastName.message}</p>}
      <label htmlFor='age'>Age</label>
      <input id='age' type="number" aria-invalid={errors.firstName ? "true" : "false"} {...register("age", { valueAsNumber: true })} />
      {errors.age && <p>{errors.age.message}</p>}
      <label htmlFor='email'>Email Address</label>
      <input id='email' type="text" aria-invalid={errors.email ? "true" : "false"} {...register('email') }/>
      {errors.email && <p>{errors.email.message}</p>}
     <input type="submit" />
    </form>
  );
}
