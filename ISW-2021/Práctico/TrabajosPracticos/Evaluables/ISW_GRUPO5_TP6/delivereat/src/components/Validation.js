import React from "react";

const Validation = async (value) => {
  let errors = {};
  if (!value.depto) {
    errors.depto = "Ingrese un Departamento";
  }
  if (!value.piso) {
    errors.piso = "Ingrese un Piso";
  }
  if (!value.producto) {
    errors.producto = "Ingrese el Nombre del Producto";
  }
  if (!value.costoProducto) {
    errors.costoProducto = "Ingrese el Costo del Producto";
  }

  if (!value.tarjeta) {
    errors.tarjeta = "Ingrese un Numero de tarjeta valido";
  }
  if (!value.titular) {
    errors.titular = "Ingrese el nombre del Titular";
  }
  if (!value.vencimiento) {
    errors.vencimiento = "Ingrese una fecha de Vencimiento";
  }
  if (!value.cvc) {
    errors.cvc = "Ingrese el codigo CVC";
  }

  return errors;
};

export default Validation;
