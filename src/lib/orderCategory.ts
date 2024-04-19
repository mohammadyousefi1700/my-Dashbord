import { database } from "appwrite.config";

export const GetOrderCategory = async () => {
  const data = database.listDocuments(
    "65bea692defb4ac174b5",
    "65e1e303e2c40ab0ae5a"
  );
  //   console.log("GetOrderCategory", (await data).documents);
  data.then((res) => console.log("res.documents", res.documents));
  const categories = (await data).documents.map((ds) => ({
    value: ds.$id,
    label: ds.statusNames,
  }));

  console.log("categories", categories);

  return categories;
  // (await data).documents.map(da=>)
  // return await data;
};
