import { Account, Client, Databases, Storage, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65132bbcaa49f6f7a7d0");

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);

export default client;
