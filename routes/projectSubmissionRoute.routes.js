const router = require("express").Router();
const {
    uploadProjectSubmissionFile,
    getAllProjectSubmissionDetails,
    getProjectSubmissionDetailsByStdId,
    updateProjectSubmissionDetails,
    deleteProjectSubmissionDetails
} = require("../controller/projectSubmission.controller");
const {
    authenticateTo
} = require("../middleware/auth.middleware");
const upload = require("../middleware/fileUpload.middleware");


router.post("/upload/project-submission", authenticateTo(["admin"]), upload.single("projectSubmissionFile"), uploadProjectSubmissionFile);
router.get("/project-submission", authenticateTo(["admin"]), getAllProjectSubmissionDetails);
router.get("/project-submission/:stdId", getProjectSubmissionDetailsByStdId);
router.patch("/project-submission/:projectSubmission_id", authenticateTo(["admin"]), updateProjectSubmissionDetails);
router.delete("/project-submission/:projectSubmission_id", authenticateTo(["admin"]), deleteProjectSubmissionDetails);


module.exports = {
    projectSubmissionRouter: router
}