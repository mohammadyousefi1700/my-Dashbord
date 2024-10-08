import { useField } from "formik";
import React from "react";

import BaseInput, { BaseInputPropType } from "./BaseInput";

export type FormikInputType = BaseInputPropType & {
  name: string;
  value?: any;
  isLink?: boolean;
  onchange?: any;
};

function FormikInput(props: FormikInputType) {
  const { value, onchange, name, ...rest } = props;
  const [field] = useField({ name, value });

  return (
    <BaseInput
      {...(rest as any)}
      {...field}
      value={value ? value : field?.value}
    />
  );
}

export default FormikInput;
