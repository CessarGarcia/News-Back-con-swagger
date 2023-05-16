const {Schema, model} = require("mongoose");

const rolesSchema = new Schema({
    name: String
}, {
    versionKey: false
});

module.exports = model("Role", rolesSchema);