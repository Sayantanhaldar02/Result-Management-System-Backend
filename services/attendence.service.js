const DataProcessingAndExtraction = require('./dataProcessingAndExtraction.service');


class AttendanceService extends DataProcessingAndExtraction {
    constructor(attendenceModel) {
        super();
        this.attendenceModel = attendenceModel;
    }

    async uploadAttendenceFile(req) {
        if (!req.file) {
            throw new Error('No file uploaded')
        };

        // Process the uploaded Excel file from memory
        const data = this.processExcelFile(req.file.buffer);
        // console.log(data)
        const attendenceData = await this.attendenceModel.insertMany(data);
        // await attendenceData.save();

        const attendenceDetails = attendenceData.map((stdData) => {
            const {
                _id,
                studentId,
                studentName,
                totalClasses,
                attendedClasses,
                percentage,
                dateUploaded
            } = stdData;
            return {
                _id,
                studentId,
                studentName,
                totalClasses,
                attendedClasses,
                percentage,
                dateUploaded
            };
        });
        return {
            message: `${attendenceDetails.length} Attendence Sheet Uploaded.`,
            data: attendenceDetails
        };
    }

    async getAllAttendenceDetails(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        // Fetch total number of attendance records
        const totalRecords = await this.attendenceModel.countDocuments();
        // Fetch paginated attendance details
        const attendence = await this.attendenceModel.find({})
            .skip(skip)
            .limit(limit);
        const details = attendence.map((assData) => {
            const {
                _id,
                studentId,
                studentName,
                totalClasses,
                attendedClasses,
                percentage,
                dateUploaded
            } = assData;
            return {
                _id,
                studentId,
                studentName,
                totalClasses,
                attendedClasses,
                percentage:percentage.toFixed(2),
                dateUploaded
            }
        })
        const response = {
            message: `${attendence.length} Attendence record found.`,
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

    async getAttendenceByStdId(req) {
        const attendence = await this.attendenceModel.find({
            studentId: req.params.stdId
        });
        // console.log(certificate)

        if (!attendence) {
            throw new Error("Attendence not found.")
        };

        const details = attendence.map((assData) => {
            const {
                _id,
                studentId,
                studentName,
                totalClasses,
                attendedClasses,
                percentage,
                dateUploaded
            } = assData;
            return {
                _id,
                studentId,
                studentName,
                totalClasses,
                attendedClasses,
                percentage:percentage.toFixed(2),
                dateUploaded
            }
        })

        if (details.length <= 0) {
            throw new Error("Attendence not found for this student.")
        }
        const response = {
            message: `${details.length} Attendence record found.`,
            data: details,
        }
        
         // Return the response after a 2-second delay
         return new Promise((resolve) => {
            setTimeout(() => {
                resolve(response);
            }, 1000); // 2000 milliseconds = 2 seconds
        });
    };

    async updateAttendenceDetails(req) {
        const attendence_id = req.params.attendence_id;
        const update_element = req.body;

        const attendence = await this.attendenceModel.findById(attendence_id);

        if (!attendence) {
            throw new Error('Attendence not found');
        };

        const update_attendence = await this.attendenceModel.findByIdAndUpdate(attendence_id, {
            ...update_element,
            percentage: ((100 * (update_element.attendedClasses ? Number(update_element.attendedClasses) : Number(attendence.attendedClasses))) / (update_element.totalClasses ? Number(update_element.totalClasses) : Number(attendence.totalClasses)))
        }, {
            runValidators: true,
        });

        return {
            message: "Attendence updated successfully.",
            data: update_attendence
        };
    };

    async deleteAttendence(req) {
        const attendence = await this.attendenceModel.findById(req.params.attendence_id);

        if (!attendence) {
            throw new Error('Attendence not found');
        };
        await this.attendenceModel.deleteOne();

        return {
            message: "Attendence Deleted"
        };
    };
}



module.exports = AttendanceService;