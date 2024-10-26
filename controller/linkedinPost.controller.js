const linkedinPostModel = require("../models/linkedInPostMarksModel.model");
const LinkedinPostService = require("../services/linkedinPost.service");
const linkedinPostService = new LinkedinPostService(linkedinPostModel);


const uploadLinkedinPostFile = async (req, res) => {
    try {
        const response = await linkedinPostService.uploadLinkedinPostFile(req);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getAllLinkedinPostDetails = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const response = await linkedinPostService.getAllLinkedinPost(Number(page), Number(limit));
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getLinkedinPostDetailsByStdId = async (req, res) => {
    try {
        const response = await linkedinPostService.getLinkedinPostByStdId(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const updateLinkedinPostDetails = async (req, res) => {
    try {
        const response = await linkedinPostService.updateLinkedinPostDetails(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const deleteLinkedinPostDetails = async (req, res) => {
    try {
        const response = await linkedinPostService.deleteLinkedinPost(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    uploadLinkedinPostFile,
    getAllLinkedinPostDetails,
    getLinkedinPostDetailsByStdId,
    updateLinkedinPostDetails,
    deleteLinkedinPostDetails
}