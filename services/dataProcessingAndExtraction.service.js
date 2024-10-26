const xlsx = require('xlsx');

class DataProcessingAndExtraction {

    formatDateString = (dateStr) => {
        // console.log(dateStr)
        if (dateStr) {
            // Split the date string into components
            const [month, day, year] = dateStr.split('/');
            // // Format and return as DD-MM-YYYY
            const formattedDay = day.padStart(2, '0');
            const formattedMonth = month.padStart(2, '0');
            const formattedYear = year.length === 2 ? '20' + year : year; // Handle two-digit years

            // console.log(new Date(dateStr))
            // Return formatted date as DD-MM-YYYY
            // return new Date(`${formattedDay}-${formattedMonth}-${formattedYear}`);
            return new Date(dateStr);
        }
        return null; // Return null if the date string is invalid
    };


    processExcelFile = (buffer) => {
        // Read the file from the buffer
        const workbook = xlsx.read(buffer, {
            type: 'buffer'
        });

        // Get the first sheet name
        const sheetName = workbook.SheetNames[0];

        // Get the worksheet
        const worksheet = workbook.Sheets[sheetName];

        // Convert worksheet to JSON format
        const data = xlsx.utils.sheet_to_json(worksheet, {
            raw: false
        });
        // console.log(data);

        // Extract the required fields from each row
        const processData = data.map((row, index) => ({...row,dateUploaded:this.formatDateString(row.dateUploaded)}));

        return processData;
    };
}

module.exports = DataProcessingAndExtraction;