import { response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from './usuario.model.js';

export const usuarioGet = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, usuario] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        usuario,
    });
}

export const usuarioById = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({ _id: id });

    res.status(200).json({
        usuario,
    });
}

export const registrar = async (req, res) => {
    const { nombre, correo, password, role} = req.body;
    const usuario = new Usuario({ nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync(); 
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario,
    });
}