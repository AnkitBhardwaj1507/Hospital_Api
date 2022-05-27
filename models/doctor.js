const mongoose = require('mongoose');

// Doctor Schema
const docSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Doctor = mongoose.model("Doctor", docSchema);

module.exports = Doctor;