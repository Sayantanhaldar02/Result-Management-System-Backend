const router = require("express").Router();
const {
    uploadAttendenceFile,
    getAllAttendenceDetails,
    getAttendenceDetailsByStdId,
    updateAttendenceDetails,
    deleteAttendenceDetails
} = require("../controller/attendence.controller");
const {
    authenticateTo
} = require("../middleware/auth.middleware");
const upload = require("../middleware/fileUpload.middleware");


router.post("/upload/attendence", authenticateTo(["admin"]), upload.single("attendenceFile"), uploadAttendenceFile);
router.get("/attendence", authenticateTo(["admin"]), getAllAttendenceDetails);
router.get("/attendence/:stdId", getAttendenceDetailsByStdId);
router.patch("/attendence/:attendence_id", authenticateTo(["admin"]), updateAttendenceDetails);
router.delete("/attendence/:attendence_id", authenticateTo(["admin"]), deleteAttendenceDetails);


module.exports = {
    attendenceRouter: router
}