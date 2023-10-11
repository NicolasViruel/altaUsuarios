//inicializamos express
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

//Routers
const usuariosRoutes = require("../server/routers/usuarios");

//body-parser - cors
app.use(bodyParser.urlencoded( {extended:true} ));
app.use(bodyParser.json());
app.use(cors());

//conectamos la base
const conectarDB = require("../server/dataBase/index");
conectarDB();

//ruta
app.use('/api/usuarios', usuariosRoutes);

const port = 4000
app.listen(port , () =>{
    console.log(`Server listo en el puerto ${port}`);
})