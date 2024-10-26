const DataProcessingAndExtraction = require('./dataProcessingAndExtraction.service');


class ProjectReviewService extends DataProcessingAndExtraction {
    constructor(projectReviewModel) {
        super();
        this.projectReviewModel = projectReviewModel;
    }

    async uploadProjectReviewFile(req) {
        if (!req.file) {
            throw new Error('No file uploaded')
        };

        // Process the uploaded Excel file from memory
        const data = this.processExcelFile(req.file.buffer);
        // console.log(data)
        const projectReviewData = await this.projectReviewModel.insertMany(data);
        // await projectReviewData.save();

        const projectReviewDetails = projectReviewData.map((stdData) => {
            const {
                _id,
                studentId,
                studentName,
                projectTitle,
                reviewScore,
                feedback,
                dateUploaded
            } = stdData;
            return {
                _id,
                studentId,
                studentName,
                projectTitle,
                reviewScore,
                feedback,
                dateUploaded
            };
        });
        return {
            message: `${projectReviewDetails.length} assessment Sheet Uploaded.`,
            data: projectReviewDetails
        };
    }

    async getAllProjectReview(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        // Fetch total number of attendance records
        const totalRecords = await this.projectReviewModel.countDocuments();
        // Fetch paginated attendance details
        const projectReview = await this.projectReviewModel.find({}).skip(skip)
            .limit(limit);
        const details = projectReview.map((assData) => {
            const {
                _id,
                studentId,
                studentName,
                projectTitle,
                reviewScore,
                feedback,
                dateUploaded
            } = assData;
            return {
                _id,
                studentId,
                studentName,
                projectTitle,
                reviewScore,
                feedback,
                dateUploaded
            }
        })
        const response = {
            message: `${projectReview.length} Project review record found.`,
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

    async getProjectReviewByStdId(req) {
        const projectReview = await this.projectReviewModel.find({
            studentId: req.params.stdId
        });
        // console.log(certificate)

        if (!projectReview) {
            throw new Error("projectReview not found.")
        };

        const details = projectReview.map((assData) => {
            const {
                _id,
                studentId,
                studentName,
                projectTitle,
                reviewScore,
                feedback,
                dateUploaded
            } = assData;
            return {
                _id,
                studentId,
                studentName,
                projectTitle,
                reviewScore,
                feedback,
                dateUploaded
            }
        })
        if (details.length <= 0) {
            throw new Error("Project review score not found for this student.")
        }
        const response = {
            message: `${details.length} Project review record found.`,
            data: details,
        };
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(response);
            }, 1000); // 2000 milliseconds = 2 seconds
        });
    };

    async updateProjectReviewDetails(req) {
        const projectReview_id = req.params.projectReview_id;
        const update_element = req.body;

        const projectReview = await this.projectReviewModel.findById(projectReview_id);

        if (!projectReview) {
            throw new Error('projectReview not found');
        };

        const update_projectReview = await this.projectReviewModel.findByIdAndUpdate(projectReview_id, update_element, {
            runValidators: true,
        });

        return {
            message: "projectReview updated successfully.",
            data: update_projectReview
        };
    };

    async deleteProjectReview(req) {
        const projectReview = await this.projectReviewModel.findById(req.params.projectReview_id);

        if (!projectReview) {
            throw new Error('projectReview not found');
        };
        await this.projectReviewModel.deleteOne();

        return {
            message: "projectReview Deleted"
        };
    };
}



module.exports = ProjectReviewService;