import { response, request } from "express";
import path from 'path';
import ExcelJS from 'exceljs';
import fs from 'fs';
import Empresa from './empresa.model.js';

export const getEmpresas = async (req, res) => {
    try {
        const { limite, desde, nivelImpacto, yearsTrayectoria, categoriaEmpresarial, sort } = req.query;
        let query = {};

        if (nivelImpacto) {
            query.nivelImpacto = nivelImpacto;
        }
        if (yearsTrayectoria) {
            query.yearsTrayectoria = yearsTrayectoria;
        }
        if (categoriaEmpresarial) {
            query.categoriaEmpresarial = categoriaEmpresarial;
        }

        let ordenamiento = {};
        if (sort === 'AZ') {
            ordenamiento.nombre = 1; 
        } else if (sort === 'ZA') {
            ordenamiento.nombre = -1; 
        }

        const empresas = await Empresa.find(query)
            .skip(Number(desde)) 
            .limit(Number(limite)) 
            .sort(ordenamiento);

        res.status(200).json({
            total: empresas.length, 
            empresas
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las empresas', error: error.message });
    }
};

export const crearEmpresa = async (req = request, res = response) => {
        const { nombre, nivelImpacto, yearsTrayectoria, categoriaEmpresarial } = req.body;
        const empresa = new Empresa({ nombre, nivelImpacto, yearsTrayectoria, categoriaEmpresarial });

        await empresa.save();
        res.status(200).json({
            empresa
        });
};

export const getAllEmpresas = async () => {
    try {
      const empresas = await Empresa.findAll();
      return empresas;
    } catch (error) {
      console.error('Error al obtener empresas:', error);
      throw error;
    }
};

export const obtenerEmpresas = async () => {
    try {
      const empresas = await Empresa.find();
      return empresas; 
    } catch (error) {
      console.error('Error al obtener las empresas:', error);
      throw error;
    }
};


export const generarReporteExcel = async (empresas) => {
    try {
      const directorio = process.env.ARCHIVOS_DIR;
  
      if (!directorio) {
        throw new Error('La variable de entorno ARCHIVOS_DIR no está definida');
      }
      if (!fs.existsSync(directorio)) {
        fs.mkdirSync(directorio, { recursive: true });
      }
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Empresas');
  
      worksheet.addRow(['Nombre', 'Nivel de Impacto', 'Años de Trayectoria', 'Categoría Empresarial']);
      
      empresas.forEach((empresa) => {
        worksheet.addRow([
          empresa.nombre,
          empresa.nivelImpacto,
          empresa.yearsTrayectoria,
          empresa.categoriaEmpresarial
        ]);
      });
  
      const filePath = path.join(directorio, 'reporte_empresas.xlsx');
      await workbook.xlsx.writeFile(filePath);
  
      return filePath;
    } catch (error) {
      console.error('Error al generar el reporte de Excel:', error);
      throw error;
    }
  };

