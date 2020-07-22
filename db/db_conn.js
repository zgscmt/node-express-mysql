
var mysql=require('mysql')

var connection =mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'zgscmt',
    database:'node_test',
    connectTimeout: 5000,  //设置连接超时
    multipleStatements: false //是否允许一个query中包含多条sql语句
})
connection.connect();

module.exports=connection