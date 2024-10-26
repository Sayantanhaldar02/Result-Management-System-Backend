const DataProcessingAndExtraction = require('./dataProcessingAndExtraction.service');


class ProjectSubmissionService extends DataProcessingAndExtraction {
    constructor(projectSubmissionModel) {
        super();
        this.projectSubmissionModel = projectSubmissionModel;
    }

    async uploadProjectSubmissionFile(req) {
        if (!req.file) {
            throw new Error('No file uploaded')
        };

        // Process the uploaded Excel file from memory
        const data = this.processExcelFile(req.file.buffer);
        // console.log(data)
        const projectSubmissionData = await this.projectSubmissionModel.insertMany(data);
        // await projectSubmissionData.save();

        const projectSubmissionDetails = projectSubmissionData.map((stdData) => {
            const {
                _id,
                studentId,
                studentName,
                projectTitle,
                submissionDate,
                score,
                feedback,
                dateUploaded
            } = stdData;
            return {
                _id,
                studentId,
                studentName,
                projectTitle,
                submissionDate,
                score,
                feedback,
                dateUploaded
            };
        });
        return {
            message: `${projectSubmissionDetails.length} Project Submission Sheet Uploaded.`,
            data: projectSubmissionDetails
        };
    }

    async getAllProjectSubmission(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        // Fetch total number of attendance records
        const totalRecords = await this.projectSubmissionModel.countDocuments();
        // Fetch paginated attendance details
        const projectSubmission = await this.projectSubmissionModel.find({}).skip(skip)
            .limit(limit);
        const details = projectSubmission.map((assData) => {
            const {
                _id,
                studentId,
                studentName,
                projectTitle,
                submissionDate,
                score,
                feedback,
                dateUploaded
            } = assData;
            return {
                _id,
                studentId,
                studentName,
                projectTitle,
                submissionDate,
                score,
                feedback,
                dateUploaded
            }
        })
        const response = {
            message: `${projectSubmission.length} Project Submission record found.`,
            pagination: {
                totalRecords,
                currentPage: page,
                totalPages: Math.ceil(totalRecords / limit),
            },
            data: details,
        };
        // Return the response after a 2-second delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(response);
            }, 1000); // 2000 milliseconds = 2 seconds
        });
    }

    async getProjectSubmissionByStdId(req) {
        const projectSubmission = await this.projectSubmissionModel.find({
            studentId: req.params.stdId
        });
        // console.log(certificate)

        if (!projectSubmission) {
            throw new Error("projectSubmission not found.")
        };

        const details = projectSubmission.map((assData) => {
            const {
                _id,
                studentId,
                studentName,
                projectTitle,
                submissionDate,
                score,
                feedback,
                dateUploaded
            } = assData;
            return {
                _id,
                studentId,
                studentName,
                projectTitle,
                submissionDate,
                score,
                feedback,
                dateUploaded
            }
        })

        if (details.length <= 0) {
            throw new Error("Project Submission score not found for this student.")
        }
        const response = {
            message: `${details.length} Project Submission record found.`,
            data: details,
        };
        // Return the response after a 2-second delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(response);
            }, 1000); // 2000 milliseconds = 2 seconds
        });
    };

    async updateProjectSubmissionDetails(req) {
        const projectSubmission_id = req.params.projectSubmission_id;
        const update_element = req.body;

        const projectSubmission = await this.projectSubmissionModel.findById(projectSubmission_id);

        if (!projectSubmission) {
            throw new Error('projectSubmission not found');
        };

        const update_projectSubmission = await this.projectSubmissionModel.findByIdAndUpdate(projectSubmission_id, update_element, {
            runValidators: true,
        });

        return {
            message: "projectSubmission updated successfully.",
            data: update_projectSubmission
        };
    };

    async deleteProjectSubmission(req) {
        const projectSubmission = await this.projectSubmissionModel.findById(req.params.projectSubmission_id);

        if (!projectSubmission) {
            throw new Error('projectSubmission not found');
        };
        await this.projectSubmissionModel.deleteOne();

        return {
            message: "projectSubmission Deleted"
        };
    };
}



module.exports = ProjectSubmissionService;