import { database } from "appwrite.config";

export const GetOrderId = async (id: string) => {
  const data = database.getDocument(
    "65bea692defb4ac174b5",
    "65bea7a66c63686afbef",
    id
  );

  return await data;
};
