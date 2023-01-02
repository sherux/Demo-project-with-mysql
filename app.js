const express = require("express");
const app = express();
app.use(express.json());
const studentroute = require("./routes/student.routes");

const courseroute = require("./routes/course.routes");

app.use("/student", studentroute);
app.use("/course", courseroute);

// ---------------------------server create -------------------
app.listen(5000, () => {
  console.log("App is running port 5000 ");
});
