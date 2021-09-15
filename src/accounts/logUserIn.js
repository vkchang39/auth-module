import { createSession } from "./session.js";
import { createTokens } from "./token.js";

export async function logUserIn(userId, req, res) {
	const connectionInformation = {
		ip: req.ip,
		userAgent: req.headers["user-agent"],
	};
	//create session
	const sessionToken = await createSession(userId, connectionInformation);
	//create JWT
	const { accessToken, refreshToken } = await createTokens(
		sessionToken,
		userId
	);
	//set Cookie
	const now = new Date();
	const refreshExpires = now.setDate(now.getDate + 30);
	res
		.setCookie("refreshToken", refreshToken, {
			path: "/",
			domain: "localhost",
			httpOnly: true,
			expires: refreshExpires,
		})
		.setCookie("accessToken", accessToken, {
			path: "/",
			domain: "localhost",
			httpOnly: true,
		});
}
