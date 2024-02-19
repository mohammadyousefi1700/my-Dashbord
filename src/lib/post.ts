import { ID } from "appwrite";
import { database } from "appwrite.config";
export type PropCreatePosts = {
  ProductName: string;
  description?: string;
  images: string;
  location: string;
  category: any;
  price: string;
  salesPerson: string;
  accountIdSales: string;
};

export const GetPostList = async () => {
  const data = database.listDocuments(
    "65bea692defb4ac174b5",
    "65ca909e17dbfeda3482"
  );
  return await data;
};
export const CreatePost = async (data: PropCreatePosts) => {
  const Postdata = await database.createDocument(
    "65bea692defb4ac174b5",
    "65ca909e17dbfeda3482",
    ID.unique(),
    data
  );
  return Postdata;
};
