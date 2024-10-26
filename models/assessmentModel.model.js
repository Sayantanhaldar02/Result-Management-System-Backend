const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    dateUploaded: {
        type: Date,
        default: Date.now
    }
});

const AssessmentModel = mongoose.model('Assessment', assessmentSchema);
module.exports = AssessmentModel;
