const directory_to_filename = (path) => {
	const partesDoCaminho = path.split('\\');
   	return partesDoCaminho[partesDoCaminho.length - 1];
}


const log = (log) => {
	console.log("LOG: " + log);
}


module.exports = {
	directory_to_filename,
	log,
}