
const connection = require("./db_conn");
var sqls = {

    //查询
    login: 'select * from user where user_name = ? and password = ?',
    //查询所有
    //登录用户
    loginUser:'select user_name,password from users where user_name  = ?',
    users: 'select * from user',
    //注册
    register: 'insert into user (user_id,user_name,password,create_time) value (0,?,?,?)',

    //查询网站
    websites: 'select * from websites limit ?,?',
    //查询网站的总数量
    webCount: 'select count(*) as total from websites',
    //新增一条网站的数据
    addWebsite: 'insert into websites (name,url,alexa,country) value(?,?,?,?)',
    //查询网站的详情
    webInfo: 'select * from websites where id = ?',
    //编辑网站记录
    webEdit: 'update websites set name=?,url=?,alexa=?,country=? where id=?',
    //删除一条记录
    webDel: 'delete from websites where id=?',

    //上传图片
    uploadImg:'insert into images value (?,0,?,?)',
    //获取图片
    getImgs:'select img_head,img_back,user_id from images where user_id=?',
    //重新上传
    updateImgs:'update images set img_head=?,img_back=? where user_id=?'



}
//处理数据库中的数据
//res，req <=== router.get()
var conn_query = function (req, res, sql, params) {
    connection.query(sql, params, function (err, result) {
        if (err) {
            let messageError = '';
            if (err.errno == 1048) {
                messageError = '参数不能为空'
            } else if (err.errno == 1062) {
                messageError = '数据已存在'
            } else if (err.errno == 1265) {
                messageError = '格式错误'
            }else if(err.errno==1327){
                messageError='参数不能为空'
            }
            else {
                messageError = '请求失败'
            }
            return res.json({
                code: err.errno,
                message: messageError
            })
        } else {
            //第二种 改版后req.data 是验证后的返回值 
            console.log('conn_',req.data)
            if (req.data) {
                return res.json({
                    code: 200,
                    message: 'success',
                    data: result
                })
            } else {
                console.log('token失效到此处')
                return res.json({
                    code: 1,
                    status: 401,
                    message: "token失效"
                })
            }
        }
    })
};
//通过post获取数据
var get_data_conn = function (req, res, sql, params, sub_sql, sub_params) {
    connection.query(sql, params, function (err, result) {
        if (err) {
            throw err;
        } else {
            //第一种方法
            if (req.data) {
                if (result.length == 0) {
                    //删除当前最后一个 ，跳转前页
                    params[0] = ((parseInt(sub_params[0]) - 1) - 1) * parseInt(sub_params[1]);
                    sub_params[0] = parseInt(sub_params[0]) - 1
                    get_data_conn(req, res, sql, params, sub_sql, sub_params)
                } else {
                    connection.query(sub_sql, sub_params, function (error, among) {
                        if (error) {
                            console.log(error);

                        } else {
                            let total = among[0]['total'];
                            return res.json({
                                code: 200,
                                message: 'success',
                                data: result,
                                paging: {
                                    page_num: parseInt(sub_params[0]),
                                    page_size: parseInt(sub_params[1]),
                                    total: total
                                }
                            })
                        }
                        console.log(result)
                    })
                }
            } else {
                //状态401返回  登录页面
                return res.json({
                    code: 1,
                    status: 401,
                    message: 'token失效'
                })
            }
        }
    })
}
module.exports = {
    sqls,
    conn_query,
    get_data_conn

}