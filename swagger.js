const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        "version": "1.0.0", 
        "title": "Node MySQl Resful Api",   
        description: "swagger autogen自動生成的Api文檔"
    },
   
    host: "localhost:3000",
    basePath: "/",
    //localhost端時為schemes＝>http
    //遠端端時為schemes＝>https
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    //安全定義
    securityDefinitions: {
        //api密鑰授權
        apiKeyAuth:{
            type: "apiKey",
            // 可以是“header”、“query”或“cookie”
            in: "header", 
            //標頭、查詢參數或 cookie 的名稱
            name: "Authorization",  
            description: ""
        }
    },
    //定義
    definitions: {
       AddItem:{
            item_name: "Apple",
            $item_desc: "Apple is good fruit",
            item_price:120,  
        },
    }
}
// 輸出的文件名稱
const outputFile = './swagger.json'; 
const endpointsFiles = ['./index.js'];
swaggerAutogen(outputFile, endpointsFiles,doc);