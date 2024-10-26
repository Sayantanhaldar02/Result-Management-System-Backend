const mongoose = require('mongoose');

const projectSubmissionSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    projectTitle: {
        type: String,
        required: true
    },
    submissionDate: {
        type: Date,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    dateUploaded: {
        type: Date,
        default: Date.now
    }
});

const ProjectSubmissionModel = mongoose.model('ProjectSubmission', projectSubmissionSchema);
module.exports = ProjectSubmissionModel;
