const router = require("express").Router();
const {
    uploadLinkedinPostFile,
    getAllLinkedinPostDetails,
    getLinkedinPostDetailsByStdId,
    updateLinkedinPostDetails,
    deleteLinkedinPostDetails
} = require("../controller/linkedinPost.controller");
const {
    authenticateTo
} = require("../middleware/auth.middleware");
const upload = require("../middleware/fileUpload.middleware");


router.post("/upload/linkedin-post", authenticateTo(["admin"]), upload.single("linkedinPostFile"), uploadLinkedinPostFile);
router.get("/linkedin-post", authenticateTo(["admin"]), getAllLinkedinPostDetails);
router.get("/linkedin-post/:stdId", getLinkedinPostDetailsByStdId);
router.patch("/linkedin-post/:linkedinPost_id", authenticateTo(["admin"]), updateLinkedinPostDetails);
router.delete("/linkedin-post/:linkedinPost_id", authenticateTo(["admin"]), deleteLinkedinPostDetails);


module.exports = {
    linkedinPostRouter: router
}