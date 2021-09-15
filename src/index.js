import "./public/env.js";
import { fastify } from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./db.js";
import { registerUser } from "./accounts/register.js";
import { authorizeUser } from "./accounts/authorize.js";
import fastifyCookie from "fastify-cookie";
import { logUserIn } from "./accounts/logUserIn.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify();

const startApp = async () => {
	try {
		app.register(fastifyCookie, {
			secret: process.env.COOKIE_SIGNATURE,
		});

		app.register(fastifyStatic, {
			root: path.join(__dirname, "public"),
		});

		app.post("/api/register", async (req, res) => {
			try {
				const userId = await registerUser(req.body.email, req.body.password);
				console.log(userId);
			} catch (e) {
				console.error(e);
			}
		});

		app.post("/api/authorize", async (req, res) => {
			try {
				const { isAuthorized, userId } = await authorizeUser(
					req.body.email,
					req.body.password
				);
				if (isAuthorized) {
					await logUserIn(userId, req, res);
					res.send({
						success: true,
					});
				}
			} catch (e) {
				console.error(e);
			}
		});

		await app.listen(3000);
		console.log("🚀  app started");
	} catch (e) {
		console.error(e);
	}
};

connectDb()
	.then(() => {
		startApp();
	})
	.catch((e) => {
		console.error(e);
	});
