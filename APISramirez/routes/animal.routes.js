const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar_campos');

const {
    animalGet,
    animalPost,
    animalDelete,
    getAnimalById,
    putAnimales} = require('../controllers/animal.controller');

const { existeMascotaById } = require('../helpers/db-validators');

const router = Router();

router.get("/", animalGet);

router.get(
    "/id:",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaById),
        validarCampos
    ], getAnimalById);

router.post(
    "/",
    [
        check("mascota", "El tipo de mascota no puede estar vacio").not().isEmpty(),
        check("raza", "El tipo de raza no puede estar vacio").not().isEmpty(),
        check("edad", "La edad de la mascota no puede estar vacio").not().isEmpty(),
        validarCampos
    ], animalPost);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaById),
        validarCampos
    ], putAnimales);

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaById),
        validarCampos
    ], animalDelete);

module.exports = router;