import cx from "classnames";
import type { FC } from "react";
import React from "react";

const VARIANT_CLASSES = {
  h1: "text-color-title text-3xl font-bold",
  h2: " text-color-title text-2xl font-bold",
  h3: " text-color-title text-lg font-semibold",
  title: "text-color-title text-base font-medium",
  subtitle: "text-color-text-subtitle text-base font-medium",
  body: "text-color-text-body text-sm font-medium",
  caption: "text-color-title text-xs font-medium",
  "mini-caption": "text-color-text-mini-caption text-2 font-normal",
  label: "block text-3.5 font-medium",
  salesLabel: "block font-normal text-color-title text-3",
  toolsLabel: "block text-color-body font-normal text-[12px] ",
  convertLabel: "block text-[13px] font-normal text-color-title",
  financeLabel:
    "block text-[16px] font-semibold text-color-body leading-7 mb-6",
  outgoingLabel:
    "block text-[15px] font-semibold text-color-body leading-7 mb-2",
  fishVarizi: "block text-[14px] text-gray-500 mr-1",
  attachInvoice:
    "block text-[14px] font-normal text-gray-medium text-right leading-[30px] pr-1",
  financialDocuments:
    "!inline text-[13px] font-semibold leading-7 pr-1 text-light-purple2 shrink-0",
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
