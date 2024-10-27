import { database } from "appwrite.config";

export const GetCategoryOpp = async () => {
  const data = database.listDocuments(
    "671eb933001b19ad2b2b",
    "671eba97000389853160"
  );
  const categories = (await data).documents.map((ds) => ({
    label: ds.EntityNameFilter,
    value: ds.$id,
  }));

  return categories;
  // (await data).documents.map(da=>)
  // return await data;
};
