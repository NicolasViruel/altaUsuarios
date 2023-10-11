import React from 'react';
import { Bar } from 'react-chartjs-2';
import { calcularEdad } from '../../utils/CalcularFecha';
import 'chart.js/auto';

const Grafica = ({ usuarios }) => {
  // Calcula las edades a partir de las fechas de nacimiento de los usuarios
  if (!usuarios) {
    return <div>Cargando usuarios...</div>;
  }
  const edades = usuarios.map((usuario) => calcularEdad(usuario.fechaNacimiento));

  // Contar las personas en cada rango de edad
  const menoresDe30 = edades.filter((edad) => edad < 30).length;
  const entre31y60 = edades.filter((edad) => edad >= 30 && edad <= 60).length;
  const mayoresDe60 = edades.filter((edad) => edad > 60).length;

  const data = {
    labels: ['Menores de 30 años', '31-60 años', 'Mayores de 60 años'],
    datasets: [
      {
        label: 'Número de Personas',
        data: [menoresDe30, entre31y60, mayoresDe60],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1, // Mostrar solo números enteros en el eje Y
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Grafica;
