var express = require('express');
var router = express.Router();
var sqlobj = require('../db/sql');
var moment = require('moment');
var connection = require('../db/db_conn');

//引入token 
var vertoken = require('../token/token');
const { param } = require('.');

/* user login. */
router.post('/login', function (req, res) {
    const params = [];
    params[0] = req.body.user_name
    params[1] = req.body.password
    console.log(params)
    if (params[0] === '' || params[1] === '') {
        return res.json({
            code: 1,
            message: '账户或密码不能为空'
        })
    } else {
        connection.query(sqlobj.sqls.login, params, function (err, result) {
            if (err) {
                throw err;
            } else {
                if (result.length != 0) {
                    console.log(result)

                    vertoken.setToken(result[0].user_name, result[0].user_id).then(data => {
                        return res.json({
                            code: 200,
                            message: '登录成功',
                            token: data
                        })
                    })
                }
                else {
                    connection.query(sqlobj.sqls.users, function (err, data) {
                        if (err) {
                            throw err;
                        } else {
                            data.some(function (item, index) {
                                if (item.user_name === params[0] && item.password != params[1]) {
                                    return res.json({
                                        code: 1,
                                        message: '密码错误'
                                    })

                                } else if (item.password == params[1] && item.user_name !== params[0]) {
                                    return res.json({
                                        code: 1,
                                        message: '用户名错误'
                                    })
                                } else {
                                    return res.json({
                                        code: 1,
                                        message: '用户不存在'
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    }
});
router.post('/register', function (req, res) {
    let params = [];
    params[0] = req.body.user_name
    params[1] = req.body.password;
    params[2] = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    if (params[0] === '' || params[1] === '') {
        return res.json({
            code: 1,
            message: '账户或密码不能为空'
        })
    } else {
        connection.query(sqlobj.sqls.users, function (err, result) {
            if (err) {
                console.log('users查询', err)
                throw err;
            } else {
                //判断用户名是否存在
                let users = [];
                result.some(function (item) {
                    users.push(item.user_name)
                })
                if (users.indexOf(params[0]) > -1) {
                    // console.log('已存在')
                    return res.json({
                        code: 1,
                        message: '用户已存在'
                    })
                } else {
                    // console.log('不存在')
                    connection.query(sqlobj.sqls.register, params, function (error, data) {
                        if (error) {
                            throw error;
                        } else {
                            return res.json({
                                code: 200,
                                message: '注册成功'
                            })
                        }
                    })

                }
            }
        })
    }

});

module.exports = router