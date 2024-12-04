var express = require('express');
var cors = require('cors');
var app = express();

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'hotel',
});

app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

app.get('/api/rooms', function (req, res, next) {
  const page = parseInt(req.query.page);
  const per_page = parseInt(req.query.per_page);
  const sort_column = req.query.sort_column;
  const sort_direction = req.query.sort_direction;
  const search = req.query.search;

  const start_idx = (page - 1) * per_page;
  var params = [start_idx, per_page];
  var sql = 'SELECT * FROM `rooms`';
  if (search) {
    sql += ' WHERE `room_id` LIKE ?';
    params.unshift('%' + search + '%');
  }
  if (sort_column) {
    sql += ' ORDER BY ' + sort_column + ' ' + sort_direction;
  }
  sql += ' LIMIT ?, ?';

  connection.query(sql, params, async function (err, results) {
    if (err) {
      return next(err);
    }
    try {
      const [countResults] = await connection.promise().query(
        'SELECT COUNT(room_id) as total FROM `rooms`'
      );
      const total = countResults[0]['total'];
      const total_pages = Math.ceil(total/per_page);
      res.json({
          page: page,
          per_page: per_page,
          total: total,
          total_pages: total_pages,
          data: results 
      });
      console.log(countResults); // countResults contains rows returned by server
    } catch (err) {
      console.log(err);
    }
  });
});
app.post('/api/rooms', function (req, res, next) {
  const { roomtype, capacity, pricepernight, availability, keeper_id } = req.body;
  const sql = 'INSERT INTO `rooms` (`roomtype`, `capacity`, `pricepernight`, `availability`, `keeper_id`) VALUES (?, ?, ?, ?, ?)';
  const params = [roomtype, capacity, pricepernight, availability, keeper_id];

  connection.query(sql, params, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Rooms created successfully', data: results });
  });
});

app.put('/api/rooms/:room_id', function (req, res, next) {
  const { keeper_id, availability } = req.body;
  const { room_id } = req.params;
  const sql = 'UPDATE `rooms` SET `keeper_id` = ?, `availability` = ? WHERE `room_id` = ?';
  const params = [keeper_id, availability, room_id];

  connection.query(sql, params, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Rooms updated successfully', data: results });
  });
});

app.delete('/api/rooms/:room_id', function (req, res, next) {
  const { room_id } = req.params;
  const sql = 'DELETE FROM `rooms` WHERE `room_id` = ?';
  const params = [room_id];

  connection.query(sql, params, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'User deleted successfully', data: results });
  });
});



// keeper page
app.get('/api/keeper', function (req, res, next) {
  const page = parseInt(req.query.page);
  const per_page = parseInt(req.query.per_page);
  const sort_column = req.query.sort_column;
  const sort_direction = req.query.sort_direction;
  const search = req.query.search;

  const start_idx = (page - 1) * per_page;
  var params = [start_idx, per_page];
  var sql = 'SELECT * FROM `keeper`';
  if (search) {
    sql += ' WHERE `keeper_id` LIKE ?';
    params.unshift('%' + search + '%');
  }
  if (sort_column) {
    sql += ' ORDER BY ' + sort_column + ' ' + sort_direction;
  }
  sql += ' LIMIT ?, ?';

  connection.query(sql, params, async function (err, results) {
    if (err) {
      return next(err);
    }
    try {
      const [countResults] = await connection.promise().query(
        'SELECT COUNT(keeper_id) as total FROM `keeper`'
      );
      const total = countResults[0]['total'];
      const total_pages = Math.ceil(total/per_page);
      res.json({
          page: page,
          per_page: per_page,
          total: total,
          total_pages: total_pages,
          data: results 
      });
      console.log(countResults); // countResults contains rows returned by server
    } catch (err) {
      console.log(err);
    }
  });
});
app.post('/api/keeper', function (req, res, next) {
  const { fname, lname, phonenumber, email, position } = req.body;
  const sql = 'INSERT INTO `keeper` (`fname`, `lname`, `phonenumber`, `email`, `position`) VALUES (?, ?, ?, ?, ?)';
  const params = [fname, lname, phonenumber, email, position];

  connection.query(sql, params, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Keeper created successfully', data: results });
  });
});

app.put('/api/keeper/:keeper_id', function (req, res, next) {
  const { position } = req.body;
  const { keeper_id } = req.params;
  const sql = 'UPDATE `keeper` SET `position` = ? WHERE `keeper_id` = ?'; // Fix the SQL syntax error
  const params = [position, keeper_id];

  connection.query(sql, params, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Keeper Position updated successfully', data: results });
  });
});

app.delete('/api/keeper/:keeper_id', function (req, res, next) {
  const { keeper_id } = req.params;
  const sql = 'DELETE FROM `keeper` WHERE `keeper_id` = ?';
  const params = [keeper_id];

  connection.query(sql, params, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Keeper deleted successfully', data: results });
  });
});






// customer page
app.get('/api/customers', function (req, res, next) {
  const page = parseInt(req.query.page);
  const per_page = parseInt(req.query.per_page);
  const sort_column = req.query.sort_column;
  const sort_direction = req.query.sort_direction;
  const search = req.query.search;

  const start_idx = (page - 1) * per_page;
  var params = [start_idx, per_page];
  var sql = 'SELECT * FROM `customers`';
  if (search) {
    sql += ' WHERE `customeer_id` LIKE ?';
    params.unshift('%' + search + '%');
  }
  if (sort_column) {
    sql += ' ORDER BY ' + sort_column + ' ' + sort_direction;
  }
  sql += ' LIMIT ?, ?';

  connection.query(sql, params, async function (err, results) {
    if (err) {
      return next(err);
    }
    try {
      const [countResults] = await connection.promise().query(
        'SELECT COUNT(customer_id) as total FROM `customers`'
      );
      const total = countResults[0]['total'];
      const total_pages = Math.ceil(total/per_page);
      res.json({
          page: page,
          per_page: per_page,
          total: total,
          total_pages: total_pages,
          data: results 
      });
      console.log(countResults); // countResults contains rows returned by server
    } catch (err) {
      console.log(err);
    }
  });
});
app.post('/api/customers', function (req, res, next) {
  const { fname, lname, phonenumber, email, room_id } = req.body;
  const sql = 'INSERT INTO `customers` (`fname`, `lname`, `phonenumber`, `email`, `room_id`) VALUES (?, ?, ?, ?, ?)';
  const params = [fname, lname, phonenumber, email, room_id];

  connection.query(sql, params, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Keeper created successfully', data: results });
  });
});

app.put('/api/customers/:customer_id', function (req, res, next) {
  const { room_id } = req.body;
  const { customer_id } = req.params;
  const sql = 'UPDATE `customers` SET `room_id` = ? WHERE `customer_id` = ?'; // Fix the SQL syntax error
  const params = [room_id, customer_id];

  connection.query(sql, params, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Keeper Position updated successfully', data: results });
  });
});

app.delete('/api/customers/:customer_id', function (req, res, next) {
  const { customer_id } = req.params;
  const sql = 'DELETE FROM `customers` WHERE `customer_id` = ?';
  const params = [customer_id];

  connection.query(sql, params, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Keeper deleted successfully', data: results });
  });
});



app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 3000');
});