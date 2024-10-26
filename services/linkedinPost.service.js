const DataProcessingAndExtraction = require('./dataProcessingAndExtraction.service');


class LinkedinPostService extends DataProcessingAndExtraction {
    constructor(linkedinPostModel) {
        super();
        this.linkedinPostModel = linkedinPostModel;
    }

    async uploadLinkedinPostFile(req) {
        if (!req.file) {
            throw new Error('No file uploaded')
        };

        // Process the uploaded Excel file from memory
        const data = this.processExcelFile(req.file.buffer);
        // console.log(data)
        const linkedinPostData = await this.linkedinPostModel.insertMany(data);
        // await linkedinPostData.save();

        const linkedinPostDetails = linkedinPostData.map((stdData) => {
            const {
                _id,
                studentId,
                studentName,
                postUrl,
                score,
                feedback,
                dateUploaded
            } = stdData;
            return {
                _id,
                studentId,
                studentName,
                postUrl,
                score,
                feedback,
                dateUploaded
            };
        });
        return {
            message: `${linkedinPostDetails.length} assessment Sheet Uploaded.`,
            data: linkedinPostDetails
        };
    }

    async getAllLinkedinPost(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        // Fetch total number of attendance records
        const totalRecords = await this.linkedinPostModel.countDocuments();
        // Fetch paginated attendance details
        const linkedinPost = await this.linkedinPostModel.find({}).skip(skip)
            .limit(limit);

        const details = linkedinPost.map((assData) => {
            const {
                _id,
                studentId,
                studentName,
                postUrl,
                score,
                feedback,
                dateUploaded
            } = assData;
            return {
                _id,
                studentId,
                studentName,
                postUrl,
                score,
                feedback,
                dateUploaded
            }
        })
        const response = {
            message: `${linkedinPost.length} Linkedin post record found.`,
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

    async getLinkedinPostByStdId(req) {
        const linkedinPost = await this.linkedinPostModel.find({
            studentId: req.params.stdId
        });
        // console.log(certificate)

        if (!linkedinPost) {
            throw new Error("linkedinPost not found.")
        };

        const details = linkedinPost.map((assData) => {
            const {
                _id,
                studentId,
                studentName,
                postUrl,
                score,
                feedback,
                dateUploaded
            } = assData;
            return {
                _id,
                studentId,
                studentName,
                postUrl,
                score,
                feedback,
                dateUploaded
            }
        })
        if (details.length <= 0) {
            throw new Error("Linkedin post not found for this student.")
        }
        const response = {
            message: `${details.length} Linkedin post record found.`,
            data: details,
        };

        // Return the response after a 2-second delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(response);
            }, 1000); // 2000 milliseconds = 2 seconds
        });
    };

    async updateLinkedinPostDetails(req) {
        const linkedinPost_id = req.params.linkedinPost_id;
        const update_element = req.body;

        const linkedinPost = await this.linkedinPostModel.findById(linkedinPost_id);

        if (!linkedinPost) {
            throw new Error('linkedinPost not found');
        };

        const update_linkedinPost = await this.linkedinPostModel.findByIdAndUpdate(linkedinPost_id, update_element, {
            runValidators: true,
        });

        return {
            message: "linkedinPost updated successfully.",
            data: update_linkedinPost
        };
    };

    async deleteLinkedinPost(req) {
        const linkedinPost = await this.linkedinPostModel.findById(req.params.linkedinPost_id);

        if (!linkedinPost) {
            throw new Error('linkedinPost not found');
        };
        await this.linkedinPostModel.deleteOne();

        return {
            message: "linkedinPost Deleted"
        };
    };
}



module.exports = LinkedinPostService;