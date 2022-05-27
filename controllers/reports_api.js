const Report = require('../models/report');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');

// Create new report
module.exports.createReport = async function(req, res) {
    
    try {
        let doctor = await Doctor.findById(req.body.doctor);
        let patient = await Patient.findById(req.params.id); 
        

        if(doctor && patient) {

            let patientReport = {
                            doctor: doctor.id,
                            patient: patient.id,
                            status: req.body.status,
                            date: req.body.date,
            };

            let report = await Report.create(patientReport);

            patient.reports.push(report);
            patient.save();

            return res.status(200).json({
                message: "Report Created Successfully",
                report: report
            })
        }else {
            
            return res.status(401).json({
                message: "Invalid details"
            });
        }
    }catch(err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// Fetching all reports with status
module.exports.allReportsWithStatus = async function(req, res){
    console.log(req);
    try {
        let statusList = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];
        if(statusList.indexOf(req.params.status) == -1) {
            return res.status(422).json({
                message: "Invalid details"
            });
        }

        let reports = await Report.find({status: req.params.status})
          .populate({
              path: 'doctor',
              select: 'name -_id'
          })
          .populate({
              path: 'patient',
              select: 'phone -_id'
          });

          console.log(reports, req.params.status);
        return res.status(200).json({
            
            message:`All reports of  ${req.params.status} people`,
            reports: reports
        });
    }catch(err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}