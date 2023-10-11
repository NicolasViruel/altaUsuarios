const usuarioModelo = require("../models/usuario");

const traerUsuarios = async (req, res) =>{
    try {
        const usuarios = await usuarioModelo.find();
        if (usuarios) {
            return res.status(200).send(usuarios);
        }else{
            return res.status(200).send([]);
        }
    } catch (error) {
        res.status(500).send(error);
    };
};


const crearUsuario = async (req, res) =>{
    const {nombre, apellido, fechaNacimiento , telefono, email} = req.body;

    const nuevoUsuario = new usuarioModelo({
        nombre,
        apellido,
        fechaNacimiento: new Date(fechaNacimiento),
        telefono,
        email,
    });
    try {
        const usuario = await nuevoUsuario.save();
        return res.status(200).send(usuario);
    } catch (error) {
        res.status(400).send({ msg: "El Usuario ya existe"});
        console.log(error);
    }
}

const eliminarUsuario = async (req, res) =>{
    const { id } = req.params;
    try {
        await usuarioModelo.findByIdAndDelete(id);
        res.status(200).send({msg:"El usuario fue eliminado"});
    } catch (error) {
        res.status(500).send({msg:"Error al eliminar el usuario"});
    }
}


module.exports ={
    traerUsuarios,
    crearUsuario,
    eliminarUsuario,
}