'use strict';

const Product = require('../model/productModel');

//讀取商品資料
exports.findAll = (req, res) =>
{
	 /*
        #swagger.summary='讀取所有商品列表',
        #swagger.description = '' */
	Product.findAll((err, products)=> {
		if (err) return res.status(500).send('獲取商品時出錯');
		//console.log('獲取所有資料', items);
		return res.send(products);
	});
};

//創建新商品
exports.create = (req, res) =>
{
	/*
        #swagger.summary='建立單一項目',
        #swagger.description = '' */
	/*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '',
            required: true,
            schema: { $ref: "#/definitions/AddItem" }
    } */
	const newProduct = new Product(req.body);
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		return res.status(400).send('缺少一個或多個必填字段');
	} if (!newProduct.product_name || !newProduct.product_desc || !newProduct.product_price) {		
		return res.status(400).send('缺少一個或多個必填字段')
	} else {		
		Product.create(newProduct, (err, product_id)=> {
			//console.log('err: ', err);
			if (err === Object) res.status(500).send('商品名稱已經被使用' + err.product_name);
			
			if (err || product_id <= 0) return res.status(500).send('新增商品時出錯');
			if (err === null) {
				return res.send(newProduct);
			}
		});
	}
};

//編輯
exports.update = (req, res) =>
{
	/*
        #swagger.summary='編輯單一項目',
        #swagger.description = '' */
	const product = new Product(req.body);
	if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
		return res.status(400).send('缺少一個或多個必填字段');
	} if (!product.product_id || !product.product_name || !product.item_desc || !product.item_price) {
		return res.status(400).send('缺少一個或多個必填字段');
	} else {
		Product.update(product, (err, result)=> {
			if (err || result <= 0) return res.status(500).send('更新項目時出錯');
			if (err === null) {
			return res.send('刪除item:'+product);
			}
			//return res.sendStatus(200);
		});
	}
};

//刪除單一id
exports.delete = (req, res)=> {
	/*
        #swagger.summary='刪除單一項目',
        #swagger.description = '' */
	const id = req.params.id;
	//console.log('id',id)
	if (!id) {
		return res.status(400).send('缺少所需的路徑變量 ID');
	}
	
	Product.delete(id, (err, employee)=> {
		if (err) return res.status(500).send('刪除項目時出錯');
		if (err === null) {
			return res.send('刪除 id:'+id);
		}
		
	});
};
//單一id 獲取
exports.findById = (req, res) =>
{
	  /*
        #swagger.summary='單一列表',
        #swagger.description = '' */
	const id = req.params.id;	
	if (!id) {
		return res.status(400).send('缺少所需的路徑變量 ID')
	}
	Product.findById(id, (err, product)=> {
		if (err) return res.status(500).send('獲取 id 的項目時出錯' + id);
		//console.log('item: ', item);
		
		return res.send(product);
	});
};
//檢索從姓名
exports.findByName = (req, res) =>
{
	  /*
        #swagger.summary='檢索單一姓名列表',
        #swagger.description = '' */
	const name = req.body.name
	if (!name) {
		return res.status(400).send('缺少必需的字段名稱')
	}
	
	Product.findByName(name, (err, products)=> {
		if (err) return res.status(500).send('獲取名稱的項目時出錯' + name);
	//	console.log('items: ', items);
		
		return res.send(products);
	});
};

