require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors")
const { authRouter } = require('./routes/auth.routes');
const { attendenceRouter } = require("./routes/attencenceRoute.routes");
const { assessmentRouter } = require("./routes/assessmentRoute.routes");
const { linkedinPostRouter } = require("./routes/linkedinPostRoute.routes");
const { projectReviewRouter } = require("./routes/projectReviewRoute.routes");
const { projectSubmissionRouter } = require("./routes/projectSubmissionRoute.routes");
const { checkAuthentication } = require("./middleware/auth.middleware");



// define middlewares
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(checkAuthentication)



// define routes
app.use("/auth",authRouter);
app.use("",attendenceRouter);
app.use("",assessmentRouter);
app.use("",linkedinPostRouter);
app.use("",projectReviewRouter);
app.use("",projectSubmissionRouter);



app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// Middleware to handle errors (both 404 and server errors).
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});


module.exports = app;
