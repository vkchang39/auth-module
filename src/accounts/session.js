import { randomBytes } from "crypto";

export async function createSession(userId, connection) {
	try {
		//generate a session token
		const sessionToken = randomBytes(43).toString("hex");
		//retreive connection information
		const { ip, userAgent } = connection;
		//save token to database
		const { session } = await import("../session/session.js");

		await session.insertOne({
			sessionToken,
			userId,
			valid: true,
			userAgent,
			ip,
			updatedAt: new Date(),
			createdAt: new Date(),
		});
		//return the token
		return sessionToken;
	} catch (error) {
		throw new Error("session failed");
	}
}
