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
  multipleStatements: true,
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
      res.json({ message: "server_error "});
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

app.post("/auth", (req, res) => {
  const RRN = sha256(req.body["RRN1"] + "-" + req.body["RRN2"]);
  pool.getConnection((err, connection) => {
    const sqlForAuth = "SELECT * FROM user WHERE name=? AND RRN=?";
    connection.query(sqlForAuth, [req.body.name, RRN], (err, rows) => {
      if (err) {
        console.log(err);
        res.json({ message: "server_error" });
      } else {
        if (rows.length == 0)
          res.json({ message: "auth_fail", code: -1})
        else
          res.json({ message: "auth_seccess", code: 1});
      }
    })
  })
});

app.delete("/members", auth, (req, res) => {
  pool.getConnection((err, connection) => {
    const sqlForDelete = "DELETE FROM user WHERE RRN=?";
    connection.query(sqlForDelete, [req.decoded.RRN], (err, rows) => {
      if (err) {
        console.log(err);
        res.json({ message: "server_error" });
      } else {
        res.json({ message: "delete_success"});
      }
    })
  })
})

app.put("/members", auth, (req, res) => {
  const RRN = req.decoded.RRN;
  const phone = req.body["phone1"] + "-" + req.body["phone2"] + "-" + req.body["phone3"];

  pool.getConnection((err, connection) => {
    const sqlForUpdate = "UPDATE user SET name=?, phone=? WHERE rrn=?";
    connection.query(sqlForUpdate, [req.body.name, phone, RRN], (err, rows) => {
      if (err) {
        console.log(err);
        res.json({message: "update_error"});
      } else {
        // jwt의 특성상 update시 새로 발급해 줘야 함
        const token = jwt.sign({
          type: 'JWT',
          RRN: RRN,
          name: req.body["name"],
        }, process.env.SECRET_KEY, {
        });

        res.json({message: "update_success", token: token});
      }
    })
  })
})


// Reserve
app.post("/reserve/hospital", (req, res) => {
  const data = [req.body.date, req.body.location3]

  // limit -> for pagination
  pool.getConnection((err, connection) => {
    const sqlForHospitalList = `select DISTINCT h.h_id, h.name, h.address
    from hospital as h, location_lv3 as l3, hospital_date as hd
    where l3.name = h.location_lv3_name and hd.h_id = h.h_id and date=? and l3.name = ? and count > 0
    limit 5;`

    connection.query(sqlForHospitalList, data, (err, rows) => {
      if (err) {
        console.log(err);
        res.json({message: "database_error"});
      } else {
        res.json({message: "success", hospitalList: rows})
      }
    })
  })
});

app.get('/reserve/hospital/vacine', (req, res) => {
  const data = [req.query.h_id, req.query.date];

  pool.getConnection((err, connection) => {
    const sqlForVacineList = `select time, v_name
    from hospital_date
    where h_id = ? and date= ? and count > 0;`;

    connection.query(sqlForVacineList, data, (err, rows) => {
      if (err) {
        console.log(err);
        res.json({message: "database_error"});
      } else {
        res.json({message: "success", vacineList: rows})
      }
    })
  })
});

app.post('/reserve', auth, (req, res) => {
  const data = [req.decoded.RRN, req.body.h_id, req.body.date, req.body.time, req.body.v_name, req.decoded.RRN];
  let number = 0;

  if (req.body.number == 1) number = "first"
  else number = "second";

  pool.getConnection((err, connection) => {
    const sqlForReserve = `insert into reserve value (NULL, ?, ?, ?, ?, ?, 0); update user set ${number} = last_insert_id() where rrn = ?;`;

    connection.query(sqlForReserve, data, (err, rows) => {
      if (err) {
        console.log(err);
        res.json({message: "database_error"});
      } else {
        res.json({message: "success"});
      }
    })
  })
});

app.get("/reserve", auth, (req, res) => {
  const data = [req.decoded.RRN, req.query.first, req.query.second];

  // 둘 다 null일 경우
  if (req.body.first == 'null' && req.body.second == 'null'){
    res.json({message: "data가 존재하지 않습니다."})
    return;
  }

  pool.getConnection((err, connection) => {
    const sqlForGetReserve = `SELECT reserve_id, date, time, v_name, h.name, address
    FROM user as u, reserve as r, hospital as h
    WHERE RRN=? AND r.h_id = h.h_id AND (r.reserve_id = ? OR r.reserve_id = ?)
    ORDER BY r.date;`

    connection.query(sqlForGetReserve, data, (err, rows) => {
      if (err) {
        console.log(err);
        res,json({message: "database_error"});
      } else {
        res.json({messsage: "success", data:rows});
      }
    })
  })

})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});