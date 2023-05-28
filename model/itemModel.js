'use strict';

var con = require('../db/mysql');

// Item Object

var Item = function(item){
  this.item_id = item.item_id;
  this.item_name = item.item_name;
  this.item_desc = item.item_desc;
  this.item_price = item.item_price;
};


Item.findById =  (id, result) =>{
	let sql = 'SELECT * FROM items WHERE item_id = ?';
	
	con.query(sql, id, (err, row, fields) => {
		//console.log("error: ", err);
		if (err) result(err, null);
		
	//	console.log(row);
		result(null, row);
	});
};

Item.findByName =  (name, result) =>{
	let sql = 'SELECT * FROM items WHERE item_name = ?';
	
	con.query(sql, name, (err, rows, fields) => {
		//console.log("error: ", err);
		if (err) result(err, null);
		
	//console.log('rows: ', rows);
		result(null, rows);
	});
};

Item.findAll = (result) =>
{
	//資料庫語法
	let sql = 'SELECT * FROM items';
	con.query(sql, (err, rows, fields) => {
	//	console.log("error: ", err);
		if (err) result(err, null);
	//	console.log('獲取所有資料B',rows);
		result(null, rows);
	});
};
//建立資料
Item.create =  (newItem, result) =>{	
	let data = [newItem.item_name, newItem.item_desc, newItem.item_price];
	let sql = 'INSERT INTO items(item_name, item_desc, item_price) VALUES(?, ?, ?)';
	
	con.query(sql, data, (err, row, fields) => {
		//console.log("error: ", err);
		if (err) result(err, null);	
		//console.log(row.insertId);
		result(null, row.insertId);
	});
};

Item.update = (item, result)=>{
	let data = [item.item_name, item.item_desc, item.item_price, item.item_id];
	
	let sql = 'UPDATE items SET item_name = ?, item_desc = ?, item_price = ? WHERE item_id = ?';
	
	con.query(sql, data, (err, row, fields) => {
		//console.log("error: ", err);
		if (err) result(err, null);
		
		//console.log(row.affectedRows);
		result(null, row.affectedRows);
	});
};
//刪除單一
Item.delete = (id, result)=>{
	let sql = 'DELETE FROM items WHERE item_id = ?';
	
	con.query(sql, id, (err, row, fields) => {
		//console.log("error: ", err);
		if (err) result(err, null);
		
		//console.log(row.affectedRows);
		result(null, row.affectedRows);
	});
};

module.exports= Item;