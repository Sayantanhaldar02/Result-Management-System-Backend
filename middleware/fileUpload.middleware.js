const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(), // Store file in memory, not on disk
    fileFilter: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        // Validate that the file is an Excel file (.xlsx or .xls)
        if (ext !== 'xlsx' && ext !== 'xls') {
            return cb(new Error('Only Excel files are allowed'));
        }
        cb(null, true);
    }
});

module.exports = upload;