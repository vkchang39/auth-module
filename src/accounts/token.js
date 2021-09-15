import jwt from "jsonwebtoken";

const JWTSignature = process.env.JWT_SIGNATURE;

export async function createTokens(sessionToken, userId) {
	try {
		//create refresh token
		// need ==>   sessionToken
		const refreshToken = jwt.sign(
			{
				sessionToken,
			},
			JWTSignature
		);
		//create access token
		// need ==> sessionToken , user id
		const accessToken = jwt.sign(
			{
				sessionToken,
				userId,
			},
			JWTSignature
		);
		//return refresh token and access token
		return { accessToken, refreshToken };
	} catch (e) {
		console.error(e);
	}
}
