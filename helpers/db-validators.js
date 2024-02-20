const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Animal = require('../models/animal');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}

const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`)
    }
}

const existeMascotaById = async (id = '') => {
    const existeMascota = await Animal.findOne({ id });
    if (existeMascota) {
        throw new Error(`El nombre del animal con el ${id} no existe`);
    }
}

const esUnaRazaValida = async (raza = '') => {
    const existeRaza = await raza.findOne({ raza });
    if (!existeRaza) {
        throw new Error(`La raza ${raza} no existe en la base de datos`);
    }
}

module.exports = {
    esRoleValido,
    existenteEmail,
    existeUsuarioById,
    existeMascotaById,
    esUnaRazaValida
}