const express = require('express');
const mysql = require('mysql2/promise'); // ✅ Use promise-based mysql2
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// ✅ Create a connection pool (recommended for scalability)
const pool = mysql.createPool({
  host: 'cicd-testdb.can8amiomg45.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'AWS$12345',
  database: 'cicd_testdb',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/api/register', async (req, res) => {
  const { name, email } = req.body;

  try {
    // ✅ Use pool.execute() — no need for connect/close
    const [result] = await pool.execute(
      'INSERT INTO Users (Name, Email) VALUES (?, ?)',
      [name, email]
    );
    res.status(200).send('Inserted successfully');
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
});

app.listen(3000, () =>
  console.log('✅ Server running on http://44.211.140.100/:3000')
);

