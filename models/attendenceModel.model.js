const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    totalClasses: {
        type: Number,
        required: true
    },
    attendedClasses: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    dateUploaded: {
        type: Date,
        default: Date.now
    }
});

const AttendanceModel = mongoose.model('Attendance', attendanceSchema);
module.exports = AttendanceModel
