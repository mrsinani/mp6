import { Collection, Db, MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI as string;

if (!MONGO_URI) {
  throw new Error("Something is wrong with your key");
}

const DB_NAME = "mp6";

export const USERS_COLLECTION = "mp6";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
  if (!client) {
    client = new MongoClient(MONGO_URI);
    await client.connect();
  }
  return client.db(DB_NAME);
}

export default async function getCollection(collectionName: string): Promise<Collection> {
  if (!db) {
    db = await connect();
  }
  return db.collection(collectionName);
}