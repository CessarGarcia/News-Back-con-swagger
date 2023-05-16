const { Router } = require("express");
const authRouter = Router();
const { check } = require("express-validator");
const { registerUser, loginUser, deleteUser, updateUsuario } = require("../controllers/authControllers");
const validationErrors = require("../middlewares/validationErrors");
const User = require("../models/usuario");

/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              properties: 
 *                  username:
 *                      type: string
 *                      description: Nombre de usuario
 *                  email:
 *                      type: string
 *                      description: Correo electronico
 *                  password:
 *                      type: string
 *                      description: contraseña encriptada por BCrypt
 *                  status:
 *                      type: string
 *                      description: stado del usuario
 *                  roles: 
 *                      type: array
 *                      description: rol del usuario
 *              required:
 *                  - username
 *                  - email
 *                  - password
 *              example:
 *                  username: example1
 *                  email: example@mail.com
 *                  password: contraseña123
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: Registra un usuario
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          501: 
 *              description: Correo ya registrado
 *          200:
 *              description: Usuario creado correctamente 
 */


authRouter.post("/register",
    [
        check("email", "El formado es invalido").isEmail(),
        check("username", "El nombre de usuario es requerido").not().isEmpty(),
        check("password", "La contraseña debe contener minimo 6 caracteres").isLength({ min: 6 }),
        validationErrors,
    ],
    registerUser);

/**
* @swagger
* /auth/login:
*  post:
*      summary: Iniciar seccion
*      tags: [User]
*      requestBody:
*          required: true
*          content:
*              application/json:
*                  schema: 
*                      type: object
*                      properties: 
*                         email:
*                             type: string
*                             description: Correo electronico
*                         password:
*                             type: string
*                             description: contraseña encriptada por BCrypt
*                      required:
*                         - email
*                         - password
*                      example:
*                         email: example@mail.com
*                         password: contraseña123
*      responses:
*          401: 
*              description: Correo o contraseña incorrecta
*          200:
*              description: Inicio de seccion correctamente 
*/

authRouter.post("/login",
    [
        check("email", "El formado es invalido").isEmail(),
        check("password", "La contraseña debe contener minimo 6 caracteres").isLength({ min: 6 }),
        validationErrors,
    ],
    loginUser);

authRouter.get('/user', async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.json({ msg: "Usuario no encontrado" })
        } return res.json({ user: user })
    } catch (error) {
        return res.json({ error: error })
    }
});

authRouter.delete('/:id', deleteUser)

authRouter.put('/:id', updateUsuario);

module.exports = authRouter;