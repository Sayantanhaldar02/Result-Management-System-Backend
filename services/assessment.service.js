const DataProcessingAndExtraction = require('./dataProcessingAndExtraction.service');


class AssessmentService extends DataProcessingAndExtraction {
    constructor(assessmentModel) {
        super();
        this.assessmentModel = assessmentModel;
    }

    async uploadAssessmentFile(req) {
        if (!req.file) {
            throw new Error('No file uploaded')
        };

        // Process the uploaded Excel file from memory
        const data = this.processExcelFile(req.file.buffer);
        // console.log(data)
        const assessmentData = await this.assessmentModel.insertMany(data);
        // await assessmentData.save();

        const assessmentDetails = assessmentData.map((stdData) => {
            const {
                _id,
                studentId,
                studentName,
                subject,
                score,
                totalMarks,
                dateUploaded
            } = stdData;
            return {
                _id,
                studentId,
                studentName,
                subject,
                score,
                totalMarks,
                dateUploaded
            };
        });
        return {
            message: `${assessmentDetails.length} assessment Sheet Uploaded.`,
            data: assessmentDetails
        };
    }


    async getAllAssessmentDetails(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const totalRecords = await this.assessmentModel.countDocuments();
        const assessment = await this.assessmentModel.find({}).skip(skip)
            .limit(limit);
        const details = assessment.map((assData) => {
            const {
                _id,
                studentId,
                studentName,
                subject,
                score,
                totalMarks,
                dateUploaded
            } = assData;
            return {
                _id,
                studentId,
                studentName,
                subject,
                score,
                totalMarks,
                dateUploaded
            }
        })
        const response = {
            message: `${assessment.length} Assessment record found.`,
            pagination: {
                totalRecords,
                currentPage: page,
                totalPages: Math.ceil(totalRecords / limit),
            },
            data: details,
        };

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(response);
            }, 1000); // 2000 milliseconds = 2 seconds
        });
    }

    async getAssessmentByStdId(req) {
        const assessment = await this.assessmentModel.find({
            studentId: req.params.stdId
        });
        // console.log(assessment)

        if (!assessment) {
            throw new Error("Assessment not found.")
        };

        const data = assessment.map((stdData) => {
            const {
                _id,
                studentId,
                studentName,
                subject,
                score,
                totalMarks,
                dateUploaded
            } = stdData;
            return {
                _id,
                studentId,
                studentName,
                subject,
                score,
                totalMarks,
                dateUploaded
            };
        });

        if (data.length <= 0) {
            throw new Error("Assessment not found for this student.")
        }

        const response = {
            message: "Assessment Found.",
            data: data
        };

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(response);
            }, 1000); // 2000 milliseconds = 2 seconds
        })
    };

    async updateAssessmentDetails(req) {
        const assessment_id = req.params.assessment_id;
        const update_element = req.body;

        const assessment = await this.assessmentModel.findById(assessment_id);

        if (!assessment) {
            throw new Error('Assessment not found');
        };

        const update_assessment = await this.assessmentModel.findByIdAndUpdate(assessment_id, update_element, {
            runValidators: true,
        });

        return {
            message: "Assessment updated successfully.",
            data: update_assessment
        };
    };

    async deleteAssessment(req) {
        const assessment = await this.assessmentModel.findById(req.params.assessment_id);

        if (!assessment) {
            throw new Error('Assessment not found');
        };
        await this.assessmentModel.deleteOne();

        return {
            message: "Assessment Deleted"
        };
    };
}



module.exports = AssessmentService;