const AssessmentModel = require("../models/assessmentModel.model");
const AssessmentService = require("../services/assessment.service");
const assessmentService = new AssessmentService(AssessmentModel);


const uploadAssessmentFile = async (req, res) => {
    try {
        const response = await assessmentService.uploadAssessmentFile(req);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getAllAssessmentDetails = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const response = await assessmentService.getAllAssessmentDetails(Number(page), Number(limit));
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getAssessmentDetailsByStdId = async (req, res) => {
    try {
        const response = await assessmentService.getAssessmentByStdId(req);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
        return res.status(400).json(error.message);
    }
}

const updateAssessmentDetails = async (req, res) => {
    try {
        const response = await assessmentService.updateAssessmentDetails(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const deleteAssessmentDetails = async (req, res) => {
    try {
        const response = await assessmentService.deleteAssessment(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    uploadAssessmentFile,
    getAllAssessmentDetails,
    getAssessmentDetailsByStdId,
    updateAssessmentDetails,
    deleteAssessmentDetails
}