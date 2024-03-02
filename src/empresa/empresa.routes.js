import { Router } from "express";
import { check } from "express-validator";
import {
    getEmpresas,
    crearEmpresa
} from "./empresa.controller.js";
//import {
//  existeEmpresaById
//} from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", getEmpresas);

//router.get(
//  "/:id",
//  [
//    check("id", "No es un ID válido").isMongoId(),
//    check("id").custom(existeEmpresaById),
//    validarCampos,
//  ],
//  getUserById
//);

router.post(
    '/',
    [
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('nivelImpacto').optional().isString(), // Validación opcional para nivelImpacto
      check('yearsTrayectoria').optional().isInt(), // Validación opcional para anosTrayectoria
      check('categoriaEmpresarial').optional().isString(), // Validación opcional para categoriaEmpresarial
      validarCampos, // Middleware para validar los campos de la solicitud
    ],
    crearEmpresa // Controlador para crear una nueva empresa
  );