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
  categoryId?: string;
  price?: string;
  $id?: string;
};
export type PropCreatePostsFormik = {
  productName: string;
  description: string;
  images: string;
  location: string;
  category: { label?: string; value: string };
  price: string;
  $id?: string;
  categoryLabel?: string;
};
// export type PropCreatePosts3 = {
//   productName: string;
//   description?: string;
//   images: string;
//   location: string;
//   category: { label?: string; value: string };
//   price: string;
//   $id?: string;
// };
// export type PropsGetOpp = {
//   $id?: string;
//   productName?: string;
//   description?: string;
//   images?: string;
//   location?: string;
//   category?: any;
//   categoryId?: any;
//   price?: string;
// };
export const GetPostList = async (Filter: FiltersOpportunityType) => {
  console.log("Filter", Filter);

  const data = database.listDocuments(
    "65bea692defb4ac174b5",
    "65ca909e17dbfeda3482",
    [
      Query.limit(8),
      Query.offset(Filter.total as number),
      Query.startsWith("productName", String(Filter.productName)),
    ]
  );
  console.log("data", (await data).documents);

  return await data;
};
export const CreatePost = async (data: PropCreatePosts) => {
  return await database.createDocument(
    "65bea692defb4ac174b5",
    "65ca909e17dbfeda3482",
    ID.unique(),
    data
  );
  // const create = await database.createDocument(
  //   "65bea692defb4ac174b5",
  //   "65ca909e17dbfeda3482",
  //   ID.unique(),
  //   data,
  //   permissions: [
  //     Permission.update(Role.user(userID)),
  //     Permission.read(Role.users()),
  //     Permission.read(Role.guests())
  // ]
  // );
  // return create;
};
export const deletePost = async (data: PropCreatePosts) => {
  const Postdata = await database.deleteDocument(
    "65bea692defb4ac174b5",
    "65ca909e17dbfeda3482",
    data.$id as string
  );
  return Postdata;
};
export const UpdateOpportunity = async (data: PropCreatePosts) => {
  console.log("data.$idaa", data.$id);

  const UpdateOpp = await database.updateDocument(
    "65bea692defb4ac174b5",
    "65ca909e17dbfeda3482",
    data.$id as string,
    {
      categoryId: data.categoryId,
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
