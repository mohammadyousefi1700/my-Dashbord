import { isRequired } from "components/FormikRequired";
import { PropCreatePostsFormik } from "lib/apiOpportunity";

const validatePostOpportunity = (formikValuse: PropCreatePostsFormik) => {
  const error: any = {};
  const requiredVariables: (keyof typeof formikValuse)[] = [
    "productName",
    "category",
    "description",
    "location",
    "price",
  ];
  requiredVariables.forEach((node) => {
    isRequired(formikValuse, error, node);
  });
  return error;
};

export default validatePostOpportunity;
