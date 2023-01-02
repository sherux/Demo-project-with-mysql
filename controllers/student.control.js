const db = require("../database");
const bcrypt = require("bcrypt");
// -----------------------------getall students----------------------
const getallstudents = (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: "Something failed!" });
    }
    res.status(200).json({ status: "data succesfully fetch", data: rows });
    console.log(rows);
  });
};

// -----------------------------get one student----------------------
const getonestudents = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM student WHERE id=?";
  db.query(sql, [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: "Something failed!" });
    }
    res.status(200).json({ status: "data succesfully fetch", data: row });
    console.log(row);
  });
};

// ------------------------create student--------------------------------
const createstudents = async (req, res) => {
  const hashpassword = await bcrypt.hash(req.body.student_password, 12);
  const student_name = req.body.student_name;
  const student_email = req.body.student_email;
  const student_password = hashpassword;
  const student_mobile = req.body.student_mobile;
  const student_gender = req.body.student_gender;
  const student_country = req.body.student_country;
  const student_city = req.body.student_city;

  const sql =
    " INSERT INTO student(student_name,student_email,student_password,student_mobile,student_gender,student_country,student_city) values ?";
  const value = [
    [
      student_name,
      student_email,
      student_password,
      student_mobile,
      student_gender,
      student_country,
      student_city,
    ],
  ];
  db.query(sql, [value], (err, rows) => {
    if (!err) {
      res.status(200).json({
        status: `student succesfully created ${rows.insertId}`,
        data: rows,
      });
      console.log(rows);
    } else {
      res.status(400).json({ error: "Something failed!" });
      // res.status(400).send(err.message);
    }
  });
};

// -------------------------------update student--------------------------------
const updatestudents = async (req, res) => {
  const id = req.params.id;
  const student_mobile = req.body.student_mobile;
  const student_country = req.body.student_country;
  const student_city = req.body.student_city;

  const sql =
    "UPDATE student SET student_mobile=?,student_country=?,student_city=? where id=?";

  db.query(
    sql,
    [student_mobile, student_country, student_city, id],
    (err, row) => {
      if (!err) {
        res
          .status(200)
          .json({ status: `student succesfully updated ${row.insertId}` });
        console.log(row);
      } else {
        // res.status(400).json({ error: "Something failed!" });
        res.status(400).send(err.message);
      }
    }
  );
};

// -------------------------------delete student--------------------------------
const deletedstudents = async (req, res) => {
  const id = req.params.id;

  const sql = "DELETE  FROM student  where id=?";

  db.query(sql, [id], (err, row, fields) => {
    if (!err) {
      res
        .status(200)
        .json({ status: `student succesfully deleted ${row.insertId}` });
      console.log(row);
    } else {
      res.status(400).json({ error: "Something failed!" });
      // res.status(400).send(err.message);
    }
  });
};
module.exports = {
  getallstudents,
  getonestudents,
  createstudents,
  updatestudents,
  deletedstudents,
};
