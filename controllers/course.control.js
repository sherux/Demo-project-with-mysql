const db = require("../database");
// -------------------------------serch api--------------------------
const getserachdata = (req, res) => {
  const course_name = req.body.course_name;
  const sql = "select * from course where course_name=? ";

  db.query(sql, [course_name], (err, row) => {
    if (err) {
      // res.status(400).json({ error: "Something failed!" });
      res.status(400).send(err.message);
    } else {
      res.status(200).json({ status: "data succesfully fetch", data: row[0] });
    }
  });
};
// -----------------------create index-------------------------------
const createindex = (req, res) => {
  const sql =
    // "drop index cou on course";

    "create index cou on course(course_name)";
  db.query(sql, (err, row) => {
    if (err) {
      // res.status(400).json({ error: "Something failed!" });
      res.status(400).send(err.message);
    } else {
      res.status(200).json({ status: "data succesfully fetch", data: row });
    }
  });
};
// ------------------------------get data use store procedure-----------------
const getusesp = (req, res) => {
  const sql = "call getallcourse()";
  db.query(sql, (err, row) => {
    if (err) {
      // res.status(400).json({ error: "Something failed!" });
      res.status(400).json({ message: err.message });
    } else {
      res.status(200).json({ status: "data succesfully fetch", data: row[0] });
    }
  });
};
// -----------------------------get all course with student----------------------
const getonecourse = (req, res) => {
  const courseid = req.params.id;
  const sql = "SELECT * FROM USERINFORMATION.studentinformation  ";
  // "drop index stu on course";
  // "SELECT student.student_name,course.course_name  FROM student INNER JOIN course ON student.id = course.student_id where id=? ";
  db.query(sql, [courseid], (err, rows) => {
    if (err) {
      // res.status(400).json({ error: "Something failed!" });
      res.status(400).json({ message: err.message });
    } else {
      res.status(200).json({ status: "data succesfully fetch", data: rows });
    }
    console.log(rows);
  });
};

// -----------------------------get one course with student----------------------
const getallcourse = (req, res) => {
  const sql =
    "SELECT student.student_name,student.student_email,course.course_name  FROM student INNER join course ON student.id = course.student_id  ";
  // "SELECT student.student_name,course.course_name  FROM student right join course ON student.id = course.student_id  ";
  db.query(sql, (err, row) => {
    if (err) {
      //   res.status(400).json({ error: "Something failed!" });
      res.status(400).send(err.message);
    } else {
      res.status(200).json({ status: "data succesfully fetch", data: row });
    }

    console.log(row);
  });
};

// ------------------------create course--------------------------------
const createcourses = async (req, res) => {
  const course_name = req.body.course_name;
  const course_description = req.body.course_description;
  const student_id = req.body.student_id;

  const sql =
    " INSERT INTO course(course_name,course_description,student_id) values ? ";
  const value = [[course_name, course_description, student_id]];
  db.query(sql, [value], (err, rows) => {
    if (!err) {
      res.status(200).json({
        status: `course succesfully created ${rows.insertId}`,
        data: rows,
      });
      console.log(rows);
    } else {
      //   res.status(400).json({ error: "Something failed!" });
      res.status(400).send(err.message);
    }
  });
};

// -------------------------------update course--------------------------------
const updatecourse = async (req, res) => {
  const courseid = req.params.id;

  const course_name = req.body.course_name;
  const course_description = req.body.course_description;

  const sql =
    "UPDATE course SET course_name=?,course_description=? WHERE courseid=?";

  db.query(sql, [course_name, course_description, courseid], (err, row) => {
    if (!err) {
      res.status(200).json({ status: "course succesfully updated " });
      console.log(row);
    } else {
      //   res.status(400).json({ error: "Something failed!" });
      res.status(400).send(err.message);
    }
  });
};

// // -------------------------------delete course--------------------------------
const deletedcourse = async (req, res) => {
  const courseid = req.params.id;
  const sql = "DELETE  FROM course  where courseid=?";

  db.query(sql, [courseid], (err, row, fields) => {
    if (!err) {
      res
        .status(200)
        .json({ status: `course succesfully deleted ${row.insertId} ` });
      console.log(row);
    } else {
      // res.status(400).json({ error: "Something failed!" });
      res.status(400).send(err.message);
    }
  });
};
module.exports = {
  getserachdata,
  createindex,
  getusesp,
  getonecourse,
  getallcourse,
  createcourses,
  updatecourse,
  deletedcourse,
};
