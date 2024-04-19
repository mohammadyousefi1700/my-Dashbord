import validateMessages from "./messageValidate";

export const isRequired = (
  values: any,
  errors: any,
  name: string,
  errorMessage?: string
) => {
  const message = errorMessage || validateMessages.required;
  const value = values[name];

  if (typeof value === "undefined" || value === null || value === "")
    errors[name] = message;
};
