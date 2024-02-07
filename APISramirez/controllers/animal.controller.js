const bcryptjs = require('bcryptjs');
const Animal = require('../models/animal');
const { response } = require('express');

const animalGet = async (req, res = response) =>{
    const { limite, desde } = req.query;
    const query = { estado: true };
    
    const [total, animales] = await Promise.all([
        Animal.countDocuments(query),
        Animal.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        animales
    });
}

const animalPost = async (req, res) => {
    const { mascota, raza, edad } = req.body;
    const animal = new Animal({ mascota, raza, edad });

    await animal.save();
    res.status(202).json({
        animal
    });
}

const getAnimalById = async (req, res) => {
    const { id } = req.params;
    const animal = await Animal.findOne({ _id: id });

    res.status(200).json({
        animal
    });
}

const putAnimales = async (req, res = response) => {
    const { id } = req.params;
    const { _id, mascota, raza, edad, ...resto } = req.body;

    if (mascota) {
        const salt = bcryptjs.genSaltSync();
        resto.mascota = bcryptjs.hashSync(mascota, salt)
    }
    
    const animal = await Animal.findByAnimalIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Informacion sobre el animal actualizada exitosamente',
        animal
    });
}

const animalDelete = async (req, res) => {
    const { id } = req.params;
    const animal = await Animal.findByAnimalIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'El animal ha sido borrado exitosamente',
        animal
    });
}

module.exports = {
    animalPost,
    animalGet,
    getAnimalById,
    putAnimales,
    animalDelete
}