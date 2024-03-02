import Usuario from '../usuario/usuario.model.js';

export const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });

    if(existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`El ID: ${id} No existe`);
    }
}