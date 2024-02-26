import { database } from "appwrite.config";

export const GetCategoryOpp = async () => {
  const data = database.listDocuments(
    "65bea692defb4ac174b5",
    "65bea8246b5564413539"
  );
  const categories = (await data).documents.map((ds) => ({
    value: ds.$id,
    label: ds.EntityNameFilter,
  }));

  return categories;
  // (await data).documents.map(da=>)
  // return await data;
};
