require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { auth } = require('./authMiddleware');
const sha256 = require('js-sha256');

const app = express();
const mysql = require('mysql');
const pool = mysql.createPool({
  connecttionLimit: 5,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// API
app.post("/members", (req, res) => {  
  const RRN = sha256(req.body["RRN1"] + "-" + req.body["RRN2"]);
  const phone = req.body["phone1"] + "-" + req.body["phone2"] + "-" + req.body["phone3"];

  const datas = [req.body["name"], RRN, req.body["foreigner"], req.body["Bdate"], req.body["gender"], phone];
  

  pool.getConnection(function(err, connection){
    const sqlForCreateUser = "INSERT INTO user(name, RRN, foreigner, Bdate, gender, phone) values(?, ?, ?, ?, ?, ?)";
    if (err){
      console.log(err);
    }
    connection.query(sqlForCreateUser, datas, function(err, rows){
      if (err) {
        console.error("err : " + err);
        res.json({ message: "signup_fail" });
      }
      else {
        res.json({ message: "success"});
      }
      connection.release();
    })
  })
});

app.get("/members", function(req, res){
  pool.getConnection(function(err, connection){
    connection.query('SELECT * FROM user', function(err, rows){
      if(err) console.error("err : " + err);

      res.json(rows);
      connection.release;
    })
  })
});

app.post("/login", (req, res) => {
  const RRN = sha256(req.body["RRN1"] + "-" + req.body["RRN2"]);
  
  const datas = [req.body["name"], RRN];

  const token = jwt.sign({
    type: 'JWT',
    RRN: RRN,
    name: req.body["name"],
  }, process.env.SECRET_KEY, {
    // expiresIn: '5m',
  });

  pool.getConnection((err, connection) => {
    const sqlForLogin = "SELECT name, RRN from user WHERE name=? AND RRN=?";
    connection.query(sqlForLogin, datas, (err, rows) => {
      if (err) {
        console.log(err);
        res.json({ message: "login_fail" });
      }
      else {
        if (rows.length == 0){
          res.json({ message: "맞는 유저가 없습니다.", code: "none"})
        }
        else res.json({ message: "success", token: token});
      }
      connection.release();
      })
  })
})

app.get("/info", auth, (req, res) => {
  const datas = [req.decoded.name, req.decoded.RRN]
  pool.getConnection((err, connection) => {
    const sqlForUserInfo = "SELECT name, phone, first, second FROM user WHERE name=? AND RRN=?";
    connection.query(sqlForUserInfo, datas, (err, rows) => {
      if (err) {
        console.log(err);
        res.json({ message: "info_fail" });
      }
      else {
        res.json(rows[0]);
      }
      connection.release();
    })
  })
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});