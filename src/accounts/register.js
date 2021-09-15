import bcrypt from "bcryptjs";
const { genSalt, hash } = bcrypt;

export async function registerUser(email, password) {
	const { user } = await import("../user/user.js");
	const salt = await genSalt(10);
	const hashedPassword = await hash(password, salt);

	const User = await user.insertOne({
		email: {
			address: email,
			verified: false,
		},
		password: hashedPassword,
	});

	return User.insertedId;
}
