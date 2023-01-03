const express = require("express");
const app = express();
app.use(express.json());
const studentroute = require("./routes/student.routes");

const courseroute = require("./routes/course.routes");
const employee = require("./routes/emp.routes");

app.use("/student", studentroute);
app.use("/course", courseroute);
app.use("/emp", employee);

// ---------------------------server create -------------------
app.listen(5000, () => {
  console.log("App is running port 5000 ");
});
