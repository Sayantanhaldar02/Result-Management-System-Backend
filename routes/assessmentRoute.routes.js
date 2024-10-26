const router = require("express").Router();
const {
    uploadAssessmentFile,
    getAllAssessmentDetails,
    getAssessmentDetailsByStdId,
    updateAssessmentDetails,
    deleteAssessmentDetails
} = require("../controller/assessment.controller");
const {
    authenticateTo
} = require("../middleware/auth.middleware");
const upload = require("../middleware/fileUpload.middleware");


router.post("/upload/assessment", authenticateTo(["admin"]), upload.single("assessmentFile"), uploadAssessmentFile);
router.get("/assessment", authenticateTo(["admin"]), getAllAssessmentDetails);
router.get("/assessment/:stdId", getAssessmentDetailsByStdId);
router.patch("/assessment/:assessment_id", authenticateTo(["admin"]), updateAssessmentDetails);
router.delete("/assessment/:assessment_id", authenticateTo(["admin"]), deleteAssessmentDetails);


module.exports = {
    assessmentRouter: router
}