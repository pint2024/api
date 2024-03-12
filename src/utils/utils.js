export const directory_to_filename = (path) => {
	const partesDoCaminho = path.split("\\");
	return partesDoCaminho[partesDoCaminho.length - 1];
};

export const filePath = (absolutePath) => {
	const partesDoCaminho = absolutePath.split("/");
	return removerExtensao(partesDoCaminho[partesDoCaminho.length - 1]);
};

export function removerExtensao(str, ext = ".js") {
	if (str.endsWith(ext)) return str.slice(0, -3);
	return str;
}
