const express = require('express');
const PORT = 5500;
require('dotenv').config();
const { Pool } = require("pg");
const path = require('path');
const app = express();
const cors = require("cors");
const corsOptions = {
	origin: 'http://localhost:5500',
	methods: ['GET', 'POST', 'PUT', 'DELETE']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend/public')));
app.use('/fonts', express.static(path.join(__dirname, 'frontend/fonts')));

const pool = new Pool ({
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
})

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'frontend/public/html/index.html'));
})
app.get('/register', (req, res) => {
	res.sendFile(path.join(__dirname, 'frontend/public/html/register.html'));
})
app.get('/main_page', (req, res) => {
	res.sendFile(path.join(__dirname, 'frontend/public/html/main_page.html'));
})
app.post('/api/person', async (req, res) => {

	const {user_name, sur_name, date_of_birth, email, password} = req.body;
	if (!user_name || !sur_name || !date_of_birth || !email || !password){
		console.error('Missing required fields');
		return res.status(400).json({error: 'All fields are required'});
	}
	try {
		const result = await pool.query(`INSERT INTO person (user_name, sur_name, date_of_birth, email, password) 
		VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user_name, sur_name, date_of_birth, email, password]) ;
		res.status(200).json(result.rows[0]);
	} catch(err) {
		console.error(err.message);
		res.status(500).json();
	}
})
app.listen(PORT, () => console.log(`Server is running: http://localhost:${PORT}`));