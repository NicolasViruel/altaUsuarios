const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuariosControllers");

router.get("/", usuarioController.traerUsuarios );

router.post("/", usuarioController.crearUsuario);

router.delete("/:id", usuarioController.eliminarUsuario);

module.exports = router;