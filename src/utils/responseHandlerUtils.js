export class Response {
	static success(res, response, status = 200) {
		return res.status(status).json({ success: true, data: response });
	}

	static error(res, error, status = 500) {
		return res.status(status).json({ success: false, data: {}, error: error });
	}
}
