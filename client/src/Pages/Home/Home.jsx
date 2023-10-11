import instance from "../../../api/axios";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Container } from "react-bootstrap";


function usuarios() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const navigate = useNavigate()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
  
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      instance
        .post('/usuarios', {
          nombre: nombre,
          apellido: apellido,
          email: email,
          telefono: telefono,
          fechaNacimiento: fechaNacimiento,
        })
        .then(response => {
          setEmail('');
          Swal.fire({
            icon: 'success',
            title: 'Usuario Creado',
            text: 'El usuario se ha creado con éxito.',
          });

          // Borrar los campos
          setNombre('');
          setApellido('');
          
          setTelefono('');
          setFechaNacimiento('');

          setValidated(false);
          navigate(`/listaPersonas`)
        })
        .catch(error => {
          console.log(error);
          console.error('Error al crear usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al crear el usuario. Por favor, inténtalo de nuevo más tarde.',
          });
        });
    }
  
    setValidated(true);
  };
  
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    const isValid = emailRegex.test(newEmail) && newEmail.length >= 6;
    setEmailValid(isValid);
  };


  return (
    <Container className="mt-5">
      <div className="card">
      <div className="card-header ">
        <h2 className="text-center">Lista Usuarios</h2>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Form.Control.Feedback>Listo!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <Form.Control.Feedback>Listo!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control type="date" placeholder="State" required value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)} />
          <Form.Control.Feedback type="invalid">
           Por favor agregue una fecha de nacimiento
          </Form.Control.Feedback>
        </Form.Group>
        
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Telefono</Form.Label>
          <Form.Control type="number" placeholder="Telefono" value={telefono} required onChange={(e) => setTelefono(e.target.value)} />
          <Form.Control.Feedback 
          type="invalid">
          Por Favor agregue un Telefono
          </Form.Control.Feedback>
        </Form.Group>
         <Form.Group as={Col} md="4" controlId="validationCustomUsername">
        <Form.Label>Email</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Email"
            aria-describedby="inputGroupPrepend"
            onChange={handleEmailChange}
            value={email}
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+" // Patrón de expresión regular para validar el correo electrónico
            required
            isInvalid={!isEmailValid} // Marcamos como inválido si no es válido
          />
          <Form.Control.Feedback type="invalid">
            {!isEmailValid ? 'Por favor, ingrese un correo electrónico válido y con al menos 6 caracteres.' : 'Por favor, agregue un correo electrónico.'}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
       
      </Row>
      <Form.Group className="mb-3 mx-2">
        <Form.Check
          required
          label="Acepta Terminos y condiciones"
          feedback="No olvide leer y aceptar terminos y condiciones"
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit" className="mx-2 my-2" >Agregar  <BsFillPersonPlusFill/></Button> 
      <Button onClick={() => navigate(`/listaPersonas`)} className="btn btn-warning mx-3">Ver Usuarios</Button> 
    </Form>

    </div>
    </Container>
    
  );
}

export default usuarios;