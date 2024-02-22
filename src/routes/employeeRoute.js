const express = require('express');
const router = express.Router();

//importar os controladores [2]
const employeeController = require('../controllers/employeeController')

router.get('/delete/:id', employeeController.delete);

router.post('/create', employeeController.create);

router.put('/update/:id', employeeController.update);

router.get('/get/:id', employeeController.get);

router.get('/save', (req, res) => {
	res.json({status: 'Employeed Saved'});
});

router.get('/list',employeeController.list);

module.exports = router;