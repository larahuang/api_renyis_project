'use strict';

const Item = require('../model/itemModel');

//讀取所有資料
exports.findAll = (req, res) =>
{
	 /*
        #swagger.summary='讀取所有資料列表',
        #swagger.description = '' */
	Item.findAll((err, items)=> {
		if (err) return res.status(500).send('獲取項目時出錯');
		//console.log('獲取所有資料', items);
		return res.send(items);
	});
};

//創建新項目
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
	const newItem = new Item(req.body);
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		return res.status(400).send('缺少一個或多個必填字段');
	} if (!newItem.item_name || !newItem.item_desc || !newItem.item_price) {		
		return res.status(400).send('缺少一個或多個必填字段')
	} else {		
		Item.create(newItem, (err, item_id)=> {
			//console.log('err: ', err);
			if (err === Object) res.status(500).send('Item already exist with name ' + err.item_name);
			
			if (err || item_id <= 0) return res.status(500).send('保存項目時出錯');
			if (err === null) {
				return res.send(newItem);
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
	const item = new Item(req.body);
	if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
		return res.status(400).send('缺少一個或多個必填字段');
	} if (!item.item_id || !item.item_name || !item.item_desc || !item.item_price) {
		return res.status(400).send('缺少一個或多個必填字段');
	} else {
		Item.update(item, function(err, result) {
			if (err || result <= 0) return res.status(500).send('更新項目時出錯');
			if (err === null) {
			return res.send('刪除item:'+item);
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
	
	Item.delete(id, (err, employee)=> {
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
	Item.findById(id, (err, item)=> {
		if (err) return res.status(500).send('獲取 id 的項目時出錯' + id);
		//console.log('item: ', item);
		
		return res.send(item);
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
	
	Item.findByName(name, (err, items)=> {
		if (err) return res.status(500).send('獲取名稱的項目時出錯' + name);
	//	console.log('items: ', items);
		
		return res.send(items);
	});
};

