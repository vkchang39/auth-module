import bcrypt from "bcryptjs";

const { compare } = bcrypt;

export async function authorizeUser(email, password) {
	const { user } = await import("../user/user.js");

	const User = await user.findOne({ "email.address": email });

	const isAuthorized = await compare(password, User.password);
	console.log(isAuthorized);
	return isAuthorized;
}
