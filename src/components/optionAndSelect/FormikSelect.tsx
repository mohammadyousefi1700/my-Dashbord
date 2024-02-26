import { useField } from "formik";
import React from "react";
import BaseSelect, { SelectPropTypes } from "./baseSelect";

export type FormikSelectPrp = Omit<SelectPropTypes, "value"> & {
  name: string;
  value?: any;
  tabIndex?: number;
  onSelect?: (renderValue: any, helpers: any) => void;
};

function FormikSelect(props: FormikSelectPrp) {
  const { value, tabIndex, name, onSelect, ...rest } = props;
  const [field, , helpers] = useField({ name, value });

  return (
    <BaseSelect
      {...field}
      tabIndex={tabIndex}
      onSelect={(newValue: any, node: any) => {
        if (onSelect) onSelect(node, helpers);
        else helpers.setValue(newValue);
      }}
      {...rest}
      onBlur={() => helpers.setTouched(true)}
    />
  );
}

export default FormikSelect;
