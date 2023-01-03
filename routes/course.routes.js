const express = require("express");
const route = express.Router();
const control = require("../controllers/course.control");

// // ------------student route--------------
route.get("/getcourseuse/sp", control.getusesp);
route.get("/getcourse/:id", control.getonecourse);
route.get("/getcourses", control.getallcourse);
route.post("/create", control.createcourses);
route.put("/update/:id", control.updatecourse);
route.delete("/delete/:id", control.deletedcourse);

module.exports = route;
