const express = require('express')

const router = express.Router()

const controller =   require('../controller/item.controller');

// 讀取所有列表
router.get('/', controller.findAll);

// 新建
router.post('/', controller.create);

// 編輯
router.put('/', controller.update);

// 刪除具有id的項目
router.delete('/:id', controller.delete);
// 檢索具有 id 的單個項目
router.get('/:id', controller.findById);

// Retrieve a single item with id
router.post('/name', controller.findByName);


module.exports = router