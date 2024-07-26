"use server";

import { ID, Query } from "appwrite";
import { database } from "appwrite.config";
import { FiltersOpportunityType } from "pages/dashbord/opportunity/component/type";
export type PropCreatePosts = {
  productName?: string;
  description?: string;
  images?: string;
  location?: string;
  category?: string;
  categoryId?: { label: string; value: string };
  price?: string;
  $id?: string;
};
export type PropCreatePostsFormik = {
  productName: string;
  description: string;
  images?: string | null;
  location: string;
  category: { label?: string; value: string };
  price: string;
  $id?: string;
  categoryLabel?: string;
  categoryId?: string;
};

export const GetPostList = async (Filter: FiltersOpportunityType) => {
  const data = database.listDocuments(
    "65bea692defb4ac174b5",
    "65ca909e17dbfeda3482",
    [
      Query.orderDesc("$createdAt"),
      Query.limit(8),
      Query.offset(Filter.total as number),
      Query.startsWith("productName", String(Filter.productName)),
    ]
  );

  return await data;
};
export const CreatePost = async (data: PropCreatePosts) => {
  return await database.createDocument(
    "65bea692defb4ac174b5",
    "65ca909e17dbfeda3482",
    ID.unique(),
    data
  );
};
export const deletePost = async (data: PropCreatePosts) => {
  const Postdata = await database.deleteDocument(
    "65bea692defb4ac174b5",
    "65ca909e17dbfeda3482",
    data.$id as string
  );
  return Postdata;
};
export const UpdateOpportunity = async (data: PropCreatePosts, id: string) => {
  console.log("dataUp", data);

  const UpdateOpp = await database.updateDocument(
    "65bea692defb4ac174b5",
    "65ca909e17dbfeda3482",
    id,
    {
      productName: data.productName,
      description: data.description,
      images: data.images,
      location: data.location,
      category: data.category,
      price: data.price,
    }
  );
  return UpdateOpp;
};
