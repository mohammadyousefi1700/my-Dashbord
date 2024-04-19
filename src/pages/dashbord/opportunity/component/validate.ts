import { isRequired } from "components/FormikRequired";
import { PropCreatePosts } from "lib/post";

const validatePostOpportunity = (formikValuse: PropCreatePosts) => {
  const error: any = {};
  const requiredVariables: (keyof typeof formikValuse)[] = [
    "ProductName",
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
