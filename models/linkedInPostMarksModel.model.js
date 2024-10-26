const mongoose = require('mongoose');

const linkedInPostSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    postUrl: {
        type: String,
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

const LinkedInPostModel = mongoose.model('LinkedInPost', linkedInPostSchema);
module.exports = LinkedInPostModel;
