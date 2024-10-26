const ProjectReviewModel = require("../models/projectReviewModel.model");
const ProjectReviewService = require("../services/projectReview.service");
const projectReviewService = new ProjectReviewService(ProjectReviewModel);


const uploadProjectReviewFile = async (req, res) => {
    try {
        const response = await projectReviewService.uploadProjectReviewFile(req);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getAllProjectReviewDetails = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const response = await projectReviewService.getAllProjectReview(Number(page), Number(limit));
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getProjectReviewDetailsByStdId = async (req, res) => {
    try {
        const response = await projectReviewService.getProjectReviewByStdId(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const updateProjectReviewDetails = async (req, res) => {
    try {
        const response = await projectReviewService.updateProjectReviewDetails(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const deleteProjectReviewDetails = async (req, res) => {
    try {
        const response = await projectReviewService.deleteProjectReview(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    uploadProjectReviewFile,
    getAllProjectReviewDetails,
    getProjectReviewDetailsByStdId,
    updateProjectReviewDetails,
    deleteProjectReviewDetails
}