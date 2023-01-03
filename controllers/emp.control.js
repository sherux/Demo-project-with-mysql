const db = require("../database");
// ------------------------------get min&max salary-----------------
const getminAndmaxsalary = (req, res) => {
  const sql = "select max(emp_salary) as salary from employee";
  //   const sql = "select min(emp_salary) as salary from employee";

  db.query(sql, (err, row) => {
    if (err) {
      // res.status(400).json({ error: "Something failed!" });
      res.status(400).send(err.message);
    } else {
      res.status(200).json({ status: "data succesfully fetch", data: row[0] });
    }
  });
};
// ------------------------------get count emp api-----------------
const getcountemp = (req, res) => {
  const sql = "select count(empid) as total_emp from employee";
  //   const sql = "select min(emp_salary) as salary from employee";

  db.query(sql, (err, row) => {
    if (err) {
      // res.status(400).json({ error: "Something failed!" });
      res.status(400).send(err.message);
    } else {
      res.status(200).json({ status: "data succesfully fetch", data: row[0] });
    }
  });
};
// ------------------------------get sum&avg emp api-----------------
const getsumAndavg = (req, res) => {
  //   const sql = "select sum(emp_salary) as total_salary from employee";
  const sql = "select avg(emp_salary) as avg_salary from employee";

  db.query(sql, (err, row) => {
    if (err) {
      // res.status(400).json({ error: "Something failed!" });
      res.status(400).send(err.message);
    } else {
      res.status(200).json({ status: "data succesfully fetch", data: row[0] });
    }
  });
};
// ------------------------------get sum&avg emp api-----------------
const getsalary = (req, res) => {
  // const sql = "SELECT * FROM employee WHERE emp_salary BETWEEN 20000 AND 50000";
  const sql =
    "SELECT  count(empid) as empid , emp_gender  FROM employee group by emp_gender HAVING COUNT(empid) >= 3  ";

  db.query(sql, (err, rows) => {
    if (err) {
      // res.status(400).json({ error: "Something failed!" });
      res.status(400).send(err.message);
    } else {
      res.status(200).json({ status: "data succesfully fetch", data: rows[0] });
    }
  });
};
// -----------------------------getall emps----------------------
const getallemployees = (req, res) => {
  const sql = "SELECT * FROM employee";
  //   const sql = "SELECT * FROM employee where emp_name like 'a%'";
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: "Something failed!" });
    }
    res.status(200).json({ status: "data succesfully fetch", data: rows });
  });
};

// -----------------------------get one emp----------------------
const getoneemployees = (req, res) => {
  const empid = req.params.id;
  const sql = "SELECT * FROM employee WHERE empid=?";
  db.query(sql, [empid], (err, row) => {
    if (err) {
      res.status(400).json({ error: "Something failed!" });
    }
    res.status(200).json({ status: "data succesfully fetch", data: row });
    console.log(row);
  });
};

// ------------------------create emp--------------------------------
const createemployees = async (req, res) => {
  const emp_name = req.body.emp_name;
  const emp_destination = req.body.emp_destination;
  const emp_gender = req.body.emp_gender;
  const emp_salary = req.body.emp_salary;

  const sql =
    " INSERT INTO employee(emp_name,emp_destination,emp_gender,emp_salary) values ?";
  const value = [[emp_name, emp_destination, emp_gender, emp_salary]];
  db.query(sql, [value], (err, rows) => {
    if (!err) {
      res.status(200).json({
        status: `emp succesfully created ${rows.insertId}`,
        data: rows,
      });
      console.log(rows);
    } else {
      //   res.status(400).json({ error: "Something failed!" });
      res.status(400).send(err.message);
    }
  });
};

// -------------------------------update emp--------------------------------
const updateemployees = async (req, res) => {
  const empid = req.params.id;
  const emp_destination = req.body.emp_destination;
  const emp_salary = req.body.emp_salary;

  const sql =
    "UPDATE employee SET emp_destination=?,emp_salary=? where empid=?";

  db.query(sql, [emp_destination, emp_salary, empid], (err, row) => {
    if (!err) {
      res.status(200).json({ status: `emp succesfully updated ` });
      console.log(row);
    } else {
      // res.status(400).json({ error: "Something failed!" });
      res.status(400).send(err.message);
    }
  });
};

// -------------------------------delete emp--------------------------------
const deletedemployees = async (req, res) => {
  const empid = req.params.id;

  const sql = "DELETE  FROM employee where empid=?";

  db.query(sql, [empid], (err, row, fields) => {
    if (!err) {
      res.status(200).json({ status: `emp succesfully deleted ` });
      console.log(row);
    } else {
      res.status(400).json({ error: "Something failed!" });
      // res.status(400).send(err.message);
    }
  });
};
module.exports = {
  getminAndmaxsalary,
  getcountemp,
  getsumAndavg,
  getsalary,
  getallemployees,
  getoneemployees,
  createemployees,
  updateemployees,
  deletedemployees,
};
