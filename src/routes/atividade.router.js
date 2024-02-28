const express = require("express");
const router = express.Router();

const controller = require("../controllers/atividade.controller");

router.post("/create", controller.negocioclientes);
router.get("/get/:id", controller.negocioclientes);
router.get("/list", controller.negocioclientes);
router.put("/update/:id", controller.negocioclientes);
router.get("/delete/:id", controller.negocioclientes);

module.exports = router;