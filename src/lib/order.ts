import { database } from "appwrite.config";

export const GetOrderId = async (id: string) => {
  try {
    const data = await database.getDocument(
      "671eb933001b19ad2b2b",
      "65bea7a66c63686afbef",
      id
    );
    return data;
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};
