import { Router, response, request } from "express";
import { check } from "express-validator";
import {
    getEmpresas,
    crearEmpresa,
    obtenerEmpresas,
    generarReporteExcel
} from "./empresa.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", getEmpresas);


router.post(
    '/',
    [
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('nivelImpacto').optional().isString(), 
      check('yearsTrayectoria').optional().isInt(), 
      check('categoriaEmpresarial').optional().isString(),
      validarCampos, 
    ], crearEmpresa);

    router.post('/generar-reporte', async (req, res) => {
        try {
          // Obtener las empresas
          const empresas = await obtenerEmpresas();
      
          const directorioReportes = './reportes';
          // Llamada a la función para generar el reporte
          const filePath = await generarReporteExcel(empresas, directorioReportes);
      
          // Envía el archivo Excel como respuesta
          res.download(filePath, 'reporte_empresas.xlsx', (err) => {
            if (err) {
              console.error('Error al enviar el archivo:', err);
              res.status(500).json({ mensaje: 'Error al enviar el archivo' });
            } else {
              console.log('Archivo enviado correctamente');
            }
          });
      
        } catch (error) {
          // Manejo de errores
          console.error('Error al generar el reporte de empresas:', error);
          res.status(500).json({ mensaje: 'Error al generar el reporte de empresas' });
        }
      });

export default router;