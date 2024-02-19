import React, { Children, ReactNode } from "react";

type BtnProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
};

function Button(props: BtnProps) {
  const { children, loading = false, leftIcon, rightIcon, className } = props;
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

export default Button;
