const handleSuccess = (res, response, status = 200) => {
	res.status(status).json(response);
};


const handleError = (res, response, status = 500) => {
	res.status(status).json(response);
};


module.exports = {
	handleSuccess,
	handleError,
}