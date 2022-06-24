
const express = require("express");
const app = express();
const itemRoutes = require("./routes");
const ExpressError = require("./expressError")

app.use(express.json());
app.use("/items", itemRoutes);

app.use(function(req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError);
  });
  
app.use(function(err, req, res, next) {
    let status = err.status || 500;

    return res.status(status).json({
        error: {
        message: err.message,
        status: status
        }
    });
});

module.exports = app;
