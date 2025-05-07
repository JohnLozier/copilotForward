import type { VercelRequest, VercelResponse } from "@vercel/node";

import Axios from "axios";
import { createHash } from "crypto";

const handler = async (request: VercelRequest, response: VercelResponse) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Headers", "*");

	if (request.method == "OPTIONS") {
		return response.status(200).send("OK");
	};

	try {
		console.log(request.url);

		let base = "https://models.github.ai/inference";

		const path = request.url?.replace(/^https?:\/\/[^/]*(?=\/)/, "");
		const json = request.body;

		const headers = { ...request.headers };
		delete headers.host;

		switch (path) {
		case "/models":
			if (!headers.authorization || createHash("sha256").update(headers.authorization).digest("base64") != process.env.COPILOT_KEY_HASH) {
				console.log("Invalid Credentials");
				return response.status(401).send("Invalid Credentials");
			};

			base = "https://api.openai.com/v1";

			headers.authorization = `Bearer ${ process.env.OPENAI_API_KEY }`;
			break;
		default:
			if (json?.model) {
				json.model = "openai/" + json.model;
			}
		}

		const { data, status, headers: responseHeaders } = await Axios.request({
			baseURL: base,
			url: path,
			method: request.method,
			data: json,
			headers: {
				authorization: headers.authorization,
				accept: headers.accept
			}
		});

		Object.entries(responseHeaders).forEach(([key, value]) => {
			response.setHeader(key, value.toString());
		});

		return response.status(status).send(data);
	} catch (error: any) {
		console.log(error);
		return response.status(500).send("Something went wrong");
	}
};

export default handler;
