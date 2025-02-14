const express = require('express');
const cors = require('cors');
const mySql = require('mysql');
const bodyParser = require('body-parser');

// from server to database code . it receives data from the react or frontend and send it to the database 

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mySql.createConnection({
    host: 'localhost',
    password: 'Rishi2004@',
    user: 'rishi',
    database: 'form'
})

db.connect(err => {
    if (err) {
        console.log("Database connection is refused",err.message);
        return;
    }
    else {
        console.log('Database connection is established');
    }
})

app.post('/submit', (req, res) => {
    const { username, email, password, confirmpassword } = req.body;

    const query = 'INSERT INTO users (username, email, password, confirmpassword) VALUES (?, ?, ?, ?)';

    db.query(query, [username, email, password, confirmpassword], (err, result) => {
        if (err) {
            console.log("Error inserting the data ", err);
            res.status(500).send("Error saving the data");
        }
        else {
            res.status(200).send('Data saved successfully');
        }
    })
});

app.listen(5000, () => {
    console.log('server is running on the port 5000');
})