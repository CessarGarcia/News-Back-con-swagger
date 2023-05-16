const rolesModel = require ("../models/roles");

const createRoles = async () => {
    try {
        const count = await rolesModel.estimatedDocumentCount();
        if (count > 0) return; 

        const values = await Promise.all([
            new rolesModel({name: "user"}).save(),
            new rolesModel({name: "creator"}).save(),
            new rolesModel({name: "admin"}).save()
        ]);
        
        console.log(values);
    } catch (error) {
        console.log(error);
    }
}

module.exports = createRoles;