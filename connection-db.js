const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'precios-1.c0f6dm2ucnlg.us-east-2.rds.amazonaws.com',
  user: 'candidatoPrueba',
  port: 3306,
  database: 'prueba',
  password: 'gaspre21.M'
});

module.exports = { connection };