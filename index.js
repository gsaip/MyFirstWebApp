const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

//Azure DB connection info
const config = {
  user: 'CICD',
  password: 'Azure@12345',
  server: 'devnewapp.database.windows.net',
  database: 'cicd_testDB',
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

app.post('/api/register', async (req, res) => {
  const { name, email } = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO Users (Name, Email) VALUES (${name}, ${email})`;
    res.status(200).send('Inserted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
