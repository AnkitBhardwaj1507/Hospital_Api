const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//create a new doctor
module.exports.register = async function(req, res) {

    console.log(req.body);
    try {
        let doctor = await Doctor.findOne({ email: req.body.email });

        // if doctor exists the render the login page
        if(doctor) {

            return res.status(200).json({
                message: 'Already Registered, Please Login to Continue !!',
                data: {
                    doctor: doctor
                }
            })
        }else {
            //create doctor
            doctor = await Doctor.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            return res.status(200).json({
                message: 'You are registered Successfully!!',
                data: {
                    doctor: doctor
                }
            });
        }
    }catch(err) {
        // console.log(err);
        return res.status(401).json({
            message: 'Internal Server Error',
        })
    }
}

// login and Create Session
module.exports.createSession = async function(req, res) {
    try {
        let doctor = await Doctor.findOne({ email: req.body.email });

        if( !doctor || doctor.password !== req.body.password ) {
            return res.status(422).json({
                message: 'Invalid Email/Password'
            });
        }
        return res.status(200).json({
            message: 'Login Successfull',
            data: {
                token: jwt.sign(doctor.toJSON(), process.env.JWT_KEY , { expiresIn : 360000000 })
            }
        })
    }catch(err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}