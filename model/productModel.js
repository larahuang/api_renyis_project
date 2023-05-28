'use strict';

var con = require('../db/mysql');

// Product Object

var Product = function(product){
  this.product_id = product.item_id;
  this.product_name = product.item_name;
  this.product_desc = product.item_desc;
  this.product_price = product.item_price;
};


Product.findById =  (id, result) =>{
	let sql = 'SELECT * FROM products WHERE product_id = ?';
	
	con.query(sql, id, (err, row, fields) => {
		//console.log("error: ", err);
		if (err) result(err, null);
		
	//	console.log(row);
		result(null, row);
	});
};

Product.findByName =  (name, result) =>{
	let sql = 'SELECT * FROM products WHERE product_name = ?';
	
	con.query(sql, name, (err, rows, fields) => {
		//console.log("error: ", err);
		if (err) result(err, null);
		
	//console.log('rows: ', rows);
		result(null, rows);
	});
};

Product.findAll = (result) =>
{
	//資料庫語法
	let sql = 'SELECT * FROM products';
	con.query(sql, (err, rows, fields) => {
	//	console.log("error: ", err);
		if (err) result(err, null);
		//console.log('獲取所有資料B',rows);
		result(null, rows);
	});
};
//建立資料
Product.create =  (newProduct, result) =>{	
	let data = [newProduct.product_name, newProduct.product_desc, newProduct.product_price];
	let sql = 'INSERT INTO products(product_name, product_desc, product_desc) VALUES(?, ?, ?)';
	
	con.query(sql, data, (err, row, fields) => {
		//console.log("error: ", err);
		if (err) result(err, null);	
		//console.log(row.insertId);
		result(null, row.insertId);
	});
};

Product.update = (newProduct, result)=>{
	let data = [newProduct.product_name, newProduct.product_desc, newProduct.product_price];
	
	let sql = 'UPDATE products SET product_name = ?, product_desc = ?, product_price = ? WHERE product_id = ?';
	
	con.query(sql, data, (err, row, fields) => {
		//console.log("error: ", err);
		if (err) result(err, null);
		
		//console.log(row.affectedRows);
		result(null, row.affectedRows);
	});
};
//刪除單一
Product.delete = (id, result)=>{
	let sql = 'DELETE FROM products WHERE product_id = ?';
	
	con.query(sql, id, (err, row, fields) => {
		//console.log("error: ", err);
		if (err) result(err, null);
		
		//console.log(row.affectedRows);
		result(null, row.affectedRows);
	});
};

module.exports= Product;