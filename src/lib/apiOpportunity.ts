"use server";

import { ID } from "appwrite";
import { database } from "appwrite.config";
export type PropCreatePosts = {
  ProductName: string;
  description?: string;
  images: string;
  location: string;
  category: { EntityNameFilter: string; $id: string };
  price: string;
  $id?: string;
};
export type PropCreatePosts2 = {
  ProductName: string;
  description?: string;
  images: string;
  location: string;
  category: { label: string; value: string };
  price: string;
  $id?: string;
};
export type PropsGetOpp = {
  $id?: string;
  ProductName?: string;
  description?: string;
  images?: string;
  location?: string;
  category?: any;
  price?: string;
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

export const UpdateOpportunity = async (data: PropCreatePosts) => {
  const UpdateOpp = await database.updateDocument(
    "65bea692defb4ac174b5",
    "65ca909e17dbfeda3482",
    data.$id as string,
    {
      ProductName: data.ProductName,
      description: data.description,
      images: data.images,
      location: data.location,
      category: data.category,
      price: data.price,
    }
  );
  return UpdateOpp;
};
