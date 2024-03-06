const directory_to_filename = (path) => {
	const partesDoCaminho = path.split('\\');
   	return partesDoCaminho[partesDoCaminho.length - 1];
}

module.exports = {
	directory_to_filename,
}