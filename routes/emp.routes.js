const express = require("express");
const route = express.Router();
const control = require("../controllers/emp.control");

// ------------employeeloyee route--------------
route.get("/getsearch", control.getserachdata);
route.get("/createindex", control.createindex);
route.get("/getminsalary", control.getminAndmaxsalary);
route.get("/getcount", control.getcountemp);
route.get("/getsumORavg", control.getsumAndavg);
route.get("/getsalary", control.getsalary);
route.get("/getallemployees", control.getallemployees);
route.get("/getemployeeloyee/:id", control.getoneemployees);
route.post("/create", control.createemployees);
route.put("/update/:id", control.updateemployees);
route.delete("/delete/:id", control.deletedemployees);

module.exports = route;
