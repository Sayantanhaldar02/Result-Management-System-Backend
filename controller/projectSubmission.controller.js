const ProjectSubmissionModel = require("../models/projectSubmissionModel.model");
const ProjectSubmissionService = require("../services/projectSubmisson.service");
const projectSubmissionService = new ProjectSubmissionService(ProjectSubmissionModel);


const uploadProjectSubmissionFile = async (req, res) => {
    try {
        const response = await projectSubmissionService.uploadProjectSubmissionFile(req);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getAllProjectSubmissionDetails = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const response = await projectSubmissionService.getAllProjectSubmission(Number(page), Number(limit));
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getProjectSubmissionDetailsByStdId = async (req, res) => {
    try {
        const response = await projectSubmissionService.getProjectSubmissionByStdId(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const updateProjectSubmissionDetails = async (req, res) => {
    try {
        const response = await projectSubmissionService.updateProjectSubmissionDetails(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const deleteProjectSubmissionDetails = async (req, res) => {
    try {
        const response = await projectSubmissionService.deleteProjectSubmission(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    uploadProjectSubmissionFile,
    getAllProjectSubmissionDetails,
    getProjectSubmissionDetailsByStdId,
    updateProjectSubmissionDetails,
    deleteProjectSubmissionDetails
}