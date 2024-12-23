import { MongoClient, ServerApiVersion } from "mongodb";

const url =
  "mongodb+srv://sathvikmu04:JdwMeeo6jIlBK7oz@petcluster.yy9ay.mongodb.net/?retryWrites=true&w=majority&appName=PetCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDatabase() {
  try {
    await client.connect();
    return client.db("petverse");
  } catch (error) {
    console.log("Error in connecting to database");
    throw error;
  }
}
