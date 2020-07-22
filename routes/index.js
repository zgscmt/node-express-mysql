var express = require('express');
var router = express.Router();
var sqlobj = require('../db/sql');


/* GET home page. */
router.post('/api/getAll', function (req, res, next) {
    // console.log('api/getAll@aa',req.data)
    const sub_params = [];
    sub_params[0] = req.body.page_num;
    sub_params[1] = req.body.page_size;
    const params = [(parseInt(sub_params[0]) - 1) * parseInt(sub_params[1]), parseInt(sub_params[1])]
    sqlobj.get_data_conn(req, res, sqlobj.sqls.websites, params, sqlobj.sqls.webCount, sub_params)
});

//新增一条数据
router.post('/api/addWebsite', function (req, res, next) {
    const params = [req.body.name, req.body.url, req.body.alexa, req.body.country];
    sqlobj.conn_query(req, res, sqlobj.sqls.addWebsite, params)
})
//查看详情
router.post('/api/webInfo', function (req, res, next) {
    const params = [req.body.id]
    sqlobj.conn_query(req, res, sqlobj.sqls.webInfo, params)
})
//编辑数据
router.post('/api/webEdit', function (req, res, next) {
    const params = [req.body.name, req.body.url, req.body.alexa, req.body.country, req.body.id]
    sqlobj.conn_query(req, res, sqlobj.sqls.webEdit, params)
})

//删除数据
router.post('/api/webDel', function (req, res, next) {
    const params = [req.body.id]
    sqlobj.conn_query(req, res, sqlobj.sqls.webDel, params)
})



module.exports = router;
