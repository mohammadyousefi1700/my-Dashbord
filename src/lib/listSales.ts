import { Query } from "appwrite";
import { database } from "appwrite.config";
import { FiltersTypePageSales } from "pages/dashbord/pageSales/components/type";

export const GetSalesList = async (Filter: FiltersTypePageSales) => {
  console.log(Filter.total);

  const data = database.listDocuments(
    "65bea692defb4ac174b5",
    "65bea8862876af4bba92",
    [
      Query.orderDesc("$createdAt"),
      Query.limit(8),
      Query.offset((Filter.total as number) || 0),
    ]
  );

  return await data;
};
