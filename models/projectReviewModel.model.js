const mongoose = require('mongoose');

const projectReviewSchema = new mongoose.Schema({
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
    reviewScore: {
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

const ProjectReviewModel = mongoose.model('ProjectReview', projectReviewSchema);
module.exports = ProjectReviewModel;
