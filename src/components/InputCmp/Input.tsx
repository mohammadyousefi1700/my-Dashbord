// import { digitsArToEn, digitsFaToEn } from "@persian-tools/persian-tools";
import {
  ChangeEvent,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";

type PropType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = forwardRef(
  (props: PropType, ref: ForwardedRef<HTMLInputElement>) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      //   event.target.value = digitsFaToEn(digitsArToEn(event.target.value));
      props?.onChange?.(event);
    };

    return (
      <input
        {...props}
        ref={ref}
        onChange={(event) => onChange(event)}
        value={props.value}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
