import { client } from "../db.js";

export const user = client.db("auth").collection("user");
