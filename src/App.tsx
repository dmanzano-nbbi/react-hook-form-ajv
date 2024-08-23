import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import { ajvResolver } from "@hookform/resolvers/ajv";

// AJV setup
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

const schema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      maxLength: 20,
      errorMessage: {
        type: "First name must be a string",
        maxLength: "First name cannot exceed 20 characters",
      },
    },
    lastName: {
      type: "string",
      pattern: "^[A-Za-z]+$",
      errorMessage: {
        type: "Last name must be a string",
        pattern: "Last name must only contain letters",
      },
    },
    age: {
      type: "number",
      minimum: 18,
      maximum: 99,
      errorMessage: {
        type: "Age must be a number",
        minimum: "Age must be at least 18",
        maximum: "Age must be less than or equal to 99",
      },
    },
  },
  required: ["firstName", "lastName", "age"],
  additionalProperties: false,
};

// Define interface
interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}

export default function App() {
  // Configure the resolver with AJV and schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: ajvResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input {...register("firstName")} />
      {errors.firstName && <p>{errors.firstName.message}</p>}{" "}
      {/* Display AJV validation errors */}
      <label>Last Name</label>
      <input {...register("lastName")} />
      {errors.lastName && <p>{errors.lastName.message}</p>}{" "}
      {/* Display AJV validation errors */}
      <label>Age</label>
      <input type="number" {...register("age")} />
      {errors.age && <p>{errors.age.message}</p>}{" "}
      {/* Display AJV validation errors */}
      <input type="submit" />
    </form>
  );
}
