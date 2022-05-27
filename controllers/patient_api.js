const Patient = require('../models/patient');
const Report = require('../models/report');
const Doctor = require('../models/doctor');

// Create Patient and report
module.exports.create = function(req, res) {
    console.log(req.body);
    Patient.findOne({ phone: req.body.phone }, function( err, patient ) {

        if(!patient) {
            Patient.create(req.body, function(err, patient){
                console.log(patient);
                if(err) {
                    console.log(err);
                    return res.json(409, {
                        message: 'Error in creating user'
                    });
                }else {
                    return res.json(200, {
                        message: 'Patient Registered',
                        info: {
                            name: patient.name,
                            phone: patient.phone,
                            status: patient.status,
                        }
                    });
                }
            });
        }else {
            return res.json(409, {
                message: 'Patient already exists with this Email'
            });
        }
    })
}


// Fetching all the report of patient
module.exports.getReport = async function(req, res) {

    let patient = await Patient.findById(req.params.id);

    try {
        if(!patient) {
            return res.status(401).json({
                message: "Invalid details"
            });
        }

    
        let reports = await Report.find({patient: req.params.id});
        return res.status(200).json({
            message: `all report of ${patient.name}`,
            reports: reports,
        })
    }catch(err) {
        console.log(err);
        return res.status(401).json({
            message: "Internal Server Error",
        });
    }
}
