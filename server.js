const express = require('express');
const PORT = 5500;
const { Pool } = require("pg");
const app = express();
const cors = require("cors");
const corsOptions = {
	origin: 'http://localhost:5500',
	methods: ['GET', 'POST', 'PUT', 'DELETE']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("frontend/public/html"));

const pool = new Pool ({
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
})

app.post('/person', async (req, res) => {
	const {user_name, sur_name, date_of_birth, email, password} = req.body;
	try {
		const result = await pool.query(`INSERT INTO (user_name, sur_name, date_of_birth, email, password) 
		VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user_name, sur_name, date_of_birth, email, password]) ;
		res.status(200).json(result.rows[0]);
	} catch(err) {
		console.error(err);
		res.status(500);
	}
})

app.listen(PORT, () => console.log(`Server is running: http://localhost:${PORT}`));