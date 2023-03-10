const express = require("express");
const route = express.Router();
const control = require("../controllers/student.control");

// ------------student route--------------
route.get("/getsearch", control.getserachdata);
route.get("/createindex", control.createindex);
route.get("/getstudents/sp", control.getusesp);
route.get("/getstudents", control.getallstudents);
route.get("/getstudent/:id", control.getonestudents);
route.post("/create", control.createstudents);
route.put("/update/:id", control.updatestudents);
route.delete("/delete/:id", control.deletedstudents);

module.exports = route;
