//先引入模块

var express = require('express')
var router = express.Router()
const multer = require('multer');
var sqlobj = require('../db/sql');

//公共方法
var common = require('../public/javascripts/common');

//图片上传
var stroage = multer.diskStorage({
    //设置上传的文件夹
    destination: function (req, file, cd) {
        cd(null, './public/images')
    },
    filename: function (req, file, cb) {
        //设置图片的名称
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
var upload = multer({ storage: stroage });

router.post('/api/upload', upload.any(), function (req, res, next) {
    console.log(req.files)
    let url = `http://${req.headers.host}/images/${req.files[0].filename}`
    if (!req.files) {
        return res.json({
            code: 1,
            message: '上传失败'
        })
    } else {

        return res.json({
            code: 200,
            message: '上传成功',
            url: url
        })

    }
})

//获取图片】
router.post('/api/getImgs', function (req, res, next) {
    if (req.data != undefined) {
        let params = [req.data.user_id]
        sqlobj.conn_query(req, res, sqlobj.sqls.getImgs, params)
    } else {
        common(res)
    }

})
//上传到数据库
router.post('/api/insert', function (req, res, next) {
    if (req.data != undefined) {
        const params = [req.data.user_id, req.body.img_head, req.body.img_back]
        sqlobj.conn_query(req, res, sqlobj.sqls.uploadImg, params)
    } else {
        common(res)
    }
})

//重新上传
router.post('/api/updateImgs', function (req, res, next) {
        const params = [req.body.img_head, req.body.img_back, req.body.user_id]
        sqlobj.conn_query(req, res, sqlobj.sqls.updateImgs, params)
})


module.exports = router





