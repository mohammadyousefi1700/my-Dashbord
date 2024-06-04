import { isRequired } from "components/FormikRequired";
import { PropCreatePosts2 } from "lib/apiOpportunity";

const validatePostOpportunity = (formikValuse: PropCreatePosts2) => {
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
