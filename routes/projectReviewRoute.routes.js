const router = require("express").Router();
const {
    uploadProjectReviewFile,
    getAllProjectReviewDetails,
    getProjectReviewDetailsByStdId,
    updateProjectReviewDetails,
    deleteProjectReviewDetails
} = require("../controller/projectReviwe.controller");
const {
    authenticateTo
} = require("../middleware/auth.middleware");
const upload = require("../middleware/fileUpload.middleware");


router.post("/upload/project-review", authenticateTo(["admin"]), upload.single("projectReviewFile"), uploadProjectReviewFile);
router.get("/project-review", authenticateTo(["admin"]), getAllProjectReviewDetails);
router.get("/project-review/:stdId", getProjectReviewDetailsByStdId);
router.patch("/project-review/:projectReview_id", authenticateTo(["admin"]), updateProjectReviewDetails);
router.delete("/project-review/:projectReview_id", authenticateTo(["admin"]), deleteProjectReviewDetails);


module.exports = {
    projectReviewRouter: router
}