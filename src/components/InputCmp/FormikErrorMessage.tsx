import classNames from "classnames";
import { getIn, useFormikContext } from "formik";

type Props = {
  name: string;
  checkBlur?: boolean;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const FormikErrorMessage = (props: Props) => {
  const { name, className, checkBlur = true, ...rest } = props;
  const { errors, touched } = useFormikContext();
  const hasError =
    getIn(errors, name as string) &&
    (checkBlur || getIn(touched, name as string));
  const errorMessage = getIn(errors, name as string);

  return hasError ? (
    <div
      className={classNames("text-[12px] !text-red-500 pt-2", className)}
      {...rest}
    >
      {errorMessage}
    </div>
  ) : null;
};

export default FormikErrorMessage;
