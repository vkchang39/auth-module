import { client } from "../db.js";

export const session = client.db("auth").collection("session");
