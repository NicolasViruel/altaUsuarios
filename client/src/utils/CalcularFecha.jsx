import { differenceInYears } from 'date-fns';

export const calcularEdad = (fechaNacimiento) => {
  const hoy = new Date();
  return differenceInYears(hoy, new Date(fechaNacimiento));
};