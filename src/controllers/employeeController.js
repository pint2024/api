var Employee = require('../model/Employee');
var Role = require('../model/Role');
var sequelize = require('../model/database');


const controllers = {}
sequelize.sync()

controllers.delete = async (req, res) => {
	// parâmetros por post
	const id = req.params.id;
	// delete por sequelize
	const del = await Employee.destroy({
		where: { id: id }
	})
	res.json({ success: true, deleted: del, message: "Deleted successful" });
}

controllers.update = async (req, res) => {
	// parameter get id
	const { id } = req.params;
	// parameter POST
	const { name, email, address, phone, role } = req.body;
	// Update data
	const data = await Employee.update({
		name: name,
		email: email,
		phone: phone,
		address: address,
		roleId: role
	},
		{
			where: { id: id }
		})
		.then(function (data) {
			return data;
		})
		.catch(error => {
			return error;
		})
	res.json({ success: true, data: data, message: "Updated successful" });
}

controllers.get = async (req, res) => {
	const { id } = req.params;
	const data = await Employee.findAll({
		where: { id: id },
		include: [Role]
	})
		.then(function (data) {
			return data;
		})
		.catch(error => {
			return error;
		})
	res.json({ success: true, data: data });
}

controllers.create = async (req, res) => {
	// data
	const { name, email, address, phone, role } = req.body;
	// create
	const data = await Employee.create({
		name: name,
		email: email,
		address: address,
		phone: phone,
		roleId: role
	})
		.then(function (data) {
			return data;
		})
		.catch(error => {
			console.log("Erro: " + error)
			return error;
		})
	// return res
	res.status(200).json({
		success: true,
		message: "Registado",
		data: data
	});
}
/*
controllers.test = (req, res) => {
	const data = {
		name: "Nuno Costa",
		age: 42,
		city: 'Viseu'
	}
	console.log("Envio de dados do Controlador EMPLOYEE.");
	res.json(data);
};

controllers.testdata = async (req, res) => {
	const response = await sequelize.sync().then(function () {
		//Cria Role
		Role.create({
			role: 'Admin'
		});
		//Cria employee
		/*Employee.create({
			name: 'Nuno1 Costa',
			email: 'ncosta@estgv.ipv.pt',
			address: 'Campus Politécnico, Viseu, Portugal',
			phone: '232480533',
			roleId: 1
		});
		Employee.create({
			name: 'Sousa Marques',
			email: 'marquesousa@nop.pt',
			address: 'Rua da Missa, Lisboa, Portugal',
			phone: '221485543',
			roleId: 1
		});
		const data = Employee.findAll()
		return data;
	})
		.catch(err => {
			return err;
		});
	res.json(response)
}
*/
controllers.list = async (req, res) => {
	const data = await Employee.findAll({
		include: [Role]
	})
		.then(function (data) {
			return data;
		})
		.catch(error => {
			return error;
		});
	res.json({ sucess: true, data: data });
}

module.exports = controllers;