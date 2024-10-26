const AttendenceModel = require("../models/attendenceModel.model");
const AttendenceService = require("../services/attendence.service");
const attendanceService = new AttendenceService(AttendenceModel);


const uploadAttendenceFile = async (req, res) => {
    try {
        const response = await attendanceService.uploadAttendenceFile(req);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getAllAttendenceDetails = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const response = await attendanceService.getAllAttendenceDetails(Number(page), Number(limit));
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getAttendenceDetailsByStdId = async (req, res) => {
    try {
        const response = await attendanceService.getAttendenceByStdId(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const updateAttendenceDetails = async (req, res) => {
    try {
        const response = await attendanceService.updateAttendenceDetails(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const deleteAttendenceDetails = async (req, res) => {
    try {
        const response = await attendanceService.deleteAttendence(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    uploadAttendenceFile,
    getAllAttendenceDetails,
    getAttendenceDetailsByStdId,
    updateAttendenceDetails,
    deleteAttendenceDetails
}