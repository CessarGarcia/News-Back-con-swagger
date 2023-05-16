const jwt = require("jsonwebtoken");
const User = require("../models/usuario");
const Role = require("../models/roles");


const verifyToken = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: "Token no valido"
            });
        }
        const decoded = jwt.verify(token, process.env.SECRETA);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({ msg: "usuario no encontrado" })
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no valido"
        });
    }
};

const iscreator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "creator") {
                next();
                return;
            }
        }
        return res.status(403).json({ message: "Require rol de creador!" });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

const isadmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
    }
}
module.exports = { verifyToken, iscreator, isadmin };