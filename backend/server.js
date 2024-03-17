const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const pgConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Xiannvshan1997!',
    port: 5432,
    timezone: 'Europe/Berlin',
};
//const databaseTable = 'EpipremnumMarbleGreen';
const databaseTable = 'PhilodendronPVerrucosum';
const pgClient = new Client(pgConfig);
pgClient.connect();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, you have reached the backend service.'); // Or send any other response you want
});

app.post('/api/write-to-table', async (req, res) => {
    try {
        const { data } = req.body;
        console.log(data);
        // Insert data into the database
        await pgClient.query('INSERT INTO ' + databaseTable + '(Temperature, Capacity) VALUES ($1, $2)', [data.Temperature, data.Capacity]);
        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
