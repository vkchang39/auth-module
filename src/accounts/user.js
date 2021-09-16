import jwt from "jsonwebtoken";
import mongo from "mongodb";

const { ObjectId } = mongo;

const JWTSignature = process.env.JWT_SIGNATURE;

export async function getUserFromCookie(req) {
	const { user } = await import("../user/user.js");

	try {
		if (req?.cookies?.accessToken) {
			const { accessToken } = req.cookies;
			const decodeAccessToken = jwt.verify(accessToken, JWTSignature);
			return user.findOne({
				_id: ObjectId(decodeAccessToken?.userId),
			});
		}
	} catch (e) {
		console.error(e);
	}
}

export async function refreshToken() {
	try {
	} catch (e) {
		console.error(e);
	}
}
