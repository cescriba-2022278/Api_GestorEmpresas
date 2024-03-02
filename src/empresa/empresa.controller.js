import { response, request } from "express";
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

        await nuevaEmpresa.save();
        res.status(200).json({
            empresa
        });
};
