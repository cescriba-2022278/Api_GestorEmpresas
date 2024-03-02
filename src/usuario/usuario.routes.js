import { Router } from "express";
import { check } from "express-validator";
import {
    usuarioGet,
    usuarioById,
    registrar
} from "./usuario.controller.js";
import {
    existenteEmail,
    existeUsuarioById
} from '../helpers/db-validator.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.get("/", usuarioGet);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ], usuarioById);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "Este no es un correo válido").isEmail(),
    check("correo").custom(existenteEmail),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({min: 6}),
    check("role", 'role necesario').not().isEmpty(),
    validarCampos,
  ], registrar);

export default router;