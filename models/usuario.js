const {Schema, model} = require("mongoose");
const bcryptjs = require("bcryptjs");

const User = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        unique: true,
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'UNVERIFIED'
    },
    roles: [{
        ref: "Role", 
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: true,
    versionKey: false,
});

User.statics.encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt(12);
    return await bcryptjs.hash(password, salt)
}

User.statics.comparePassword = async (password, receivedPassword)=> {
    return await bcryptjs.compare(password, receivedPassword)
}

module.exports = model("User", User);