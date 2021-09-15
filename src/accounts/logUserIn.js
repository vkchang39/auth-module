import { createSession } from "./session.js";

export async function logUserIn(userId, req, res) {
	const connectionInformation = {
		ip: req.ip,
		userAgent: req.headers["user-agent"],
	};
	//create session
	const sessionToken = await createSession(userId, connectionInformation);
	console.log(sessionToken);
	//create JWT
	//set Cookie
}
