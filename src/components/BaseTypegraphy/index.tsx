import cx from "classnames";
import type { FC } from "react";
import React from "react";

const VARIANT_CLASSES = {
  h1: "text-color-title text-3xl font-bold",
  h2: " text-color-title text-2xl font-bold",
  h3: " text-color-title text-lg font-semibold",
  title: "text-color-title  text-base font-medium",
  subtitle: "text-color-text-subtitle text-base font-medium",
  body: "text-color-text-body text-sm font-medium",
  caption: "text-color-title text-xs font-medium",
  "mini-caption": "text-color-text-mini-caption text-2 font-normal",
  label: "block text-3.5 font-medium",
};

export type VariantsType = keyof typeof VARIANT_CLASSES;

type Props = {
  variant?: VariantsType;
  isBold?: boolean;
  as?: any;
  [key: string]: any;
};

const BaseTypography: FC<Props> = (props) => {
  const { className, variant = "body", isBold, children, as, ...rest } = props;

  const WrapperComponent = as || ("p" as any);

  return (
    <WrapperComponent
      {...rest}
      className={cx(VARIANT_CLASSES[variant], className, isBold && "font-bold")}
    >
      {children}
    </WrapperComponent>
  );
};

export default BaseTypography;
