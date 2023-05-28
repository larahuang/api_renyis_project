var mysql = require('mysql')
//環境變數
require('dotenv').config()
var con = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
});
//建立連結資料庫
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to MySQL!");
});

module.exports = con;