import mongo from "mongodb";

const { MongoClient } = mongo;

const url = process.env.MONGO_URL;

export const client = new MongoClient(url, { useNewUrlParser: true });

export const connectDb = async () => {
	try {
		await client.connect();

		await client.db("admin").command({ ping: 1 });
		console.log("🗄 database connected successfully");
	} catch (e) {
		console.error(e);
		await client.close();
	}
};
