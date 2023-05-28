const express = require('express')
const router = express.Router()
const controller = require('../controller/item.controller');

// 檢索具有 id 的單個項目
router.get('/:id', controller.findById);

// 檢索具有 id 的單個項目
router.post('/name', controller.findByName);

// 檢索所有項目
router.get('/users', controller.findAll);

// 創建新項目
router.post('/users', controller.create);

// 編輯項目
router.put('/users/:id', controller.update);

// 刪除項目
router.delete('/users/:id', controller.delete);

module.exports = router

//https://github.com/roytuts/nodejs/tree/master/nodejs_mysql_rest_api_crud