const express = require('express');
const PORT = 5500;
const { Pool } = require("pg");
require("dotenv").config();
const corsOptions = {
	origin: 'http://localhost:5500',
	methods: ['GET', 'POST', 'PUT', 'DELETE']
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("frontend/public"));