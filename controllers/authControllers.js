const jwt = require("jsonwebtoken");
const User = require("../models/usuario");
const Role = require("../models/roles");
const { sendEmail } = require("../config/mail.config");


const registerUser = async (req, res) => {
    const { email, password, username, roles } = req.body;

    if (!email || !password || !username) {
        return res.json({ msg: "Por favor ingrese todos los datos" })
    }
    try {
        let userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(501).json({
                ok: false,
                msg: "Correo ya registrado"
            });
        }

        const nuevoUsuario = new User({ email, password: await User.encryptPassword(password), username });

        // Enviar el email
        await sendEmail(email, username, 'Correo enviado por AgensPresse');

        // Verificamos el tipo de rol ingresado, si el rol esta vacio se asigna por defecto Role: user 
        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            nuevoUsuario.roles = foundRoles.map(role => role._id)
        } else {
            const role = await Role.findOne({ name: "user" })
            nuevoUsuario.roles = [role._id]
        }

        //Guardamos el usuario
        const saveUser = await nuevoUsuario.save();

        const payload = {
            id: nuevoUsuario.id,
        }

        // Asignamos token
        //TODO: Con expiresIn Definimos que el token expira en 1800s = 30min
        const token = await jwt.sign(payload, process.env.SECRETA, { expiresIn: 1800 }, (error, token) => {
            res.json({
                ok: true,
                msg: "Usuario Creado Correctamente",
                token,
                saveUser
            });
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: "Error al registrar"
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password, roles } = req.body;
    if (!email || !password) {
        return res.json({ msg: "Por favor ingrese todos los datos" })
    }
    try {
        const userFound = await User.findOne({ email }).populate("roles");
        if (!userFound) {
            return res.status(401).json({
                ok: false,
                msg: "Correo o contraseña incorrecta"
            });
        }
        const passwordValido = await User.comparePassword(password, userFound.password)
        if (!passwordValido) {
            return res.status(401).json({
                ok: false,
                msg: "Correo o contraseña incorrecta"
            });
        }
        const payload = {
            id: userFound.id,
            roles: userFound.roles
        }

        //TODO: Con expiresIn Definimos que el token expira en 1800s = 30min
        jwt.sign(payload, process.env.SECRETA, { expiresIn: 1800 }, (error, token) => {
            res.json({
                ok: true,
                msg: "Login Correcto",
                token,
                roles: userFound.roles,
                userFound
            });
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: "Error al registrar"
        });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminarUsuario = await User.findByIdAndRemove(id);
        return res.json({
            ok: true,
            msg: "Usuario borrado correctamente",
            eliminarUsuario,
        });
    } catch (error) {
        return res.status(404).json({
            ok: true,
            msg: "Usuario no eliminada",
        });
    }
};

const updateUsuario = async (req, res) => {
    try {
        const { email, password, username } = req.body;
		//Requerimos el id del usuario
        let updateUser = await User.findById(req.params.id);

        //Buscamos si existe el usuario
        if (!updateUser) {
            res.status(404).json({ msg: 'El usuario no exite' })
        }
        updateUser.email = email;
        updateUser.password = password;
        updateUser.username = username;

        updateUser = await User.findByIdAndUpdate({ _id: req.params.id }, updateUser, { new: true })
        return res.json({
            ok: true,
            updateUser,
            msg: "Usuario actialiazado"
        });
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: "Usuario no actualizado"
        })
    }
};


module.exports = {
    loginUser,
    registerUser, 
    deleteUser,
    updateUsuario,
};