import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import instance from "../../../api/axios";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BsFillTrash3Fill } from "react-icons/bs";
import Grafica from "./grafica";
import { calcularEdad } from "../../utils/CalcularFecha";

const ListaPersonas = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const traerUsuarios = async () => {
    try {
      const resp = await instance.get("/usuarios");
      const usuariosData = resp.data;
      setUsuarios(usuariosData);
    } catch (error) {
      console.log(error);
      console.error("Error al traer los usuario:", error);
    }
  };

  const borrarUsuario = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, bórralo",
      });

      if (result.isConfirmed) {
        const resp = await instance.delete(`/usuarios/${id}`);
        if (resp.status === 200) {
          Swal.fire("Borrado", "Usuario Borrado con éxito.", "success");
          traerUsuarios();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    traerUsuarios();
  }, []);

  return (
    <>
      <h1 className="text-center">Mis Usuarios</h1>
      <div className="row">
        <div className="col-md-8">
          <Table
            striped
            bordered
            hover
            responsive
            variant="dark"
            className="align-middle text-center mt-3"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha</th>
                <th>Telefono</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((usuario, index) => (
                  <tr key={usuario._id}>
                    <td>{index + 1}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>
                    <td>{calcularEdad(usuario.fechaNacimiento)}</td>
                    <td>{usuario.telefono}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <Button
                          variant="outline-danger mx-1"
                          onClick={() => borrarUsuario(usuario._id)}
                        >
                          <BsFillTrash3Fill />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <Spinner color="warning" />
                  </td>
                  <td colSpan="7">Cargando Usuarios</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div
          className="col-md-4 bg-ligth mx-auto border border-2 border-primary"
          style={{ width: "350px", height: "255px" }}
        >
          <div style={{ width: "100%", height: "100%", padding: "10px 0" }}>
            <Grafica usuarios={usuarios}/>
          </div>
        </div>
      </div>
      <Button onClick={() => navigate(`/`)}>Volver atras</Button>
    </>
  );
};

export default ListaPersonas;
