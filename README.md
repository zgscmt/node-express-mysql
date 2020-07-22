# node-express-mysql
node.js通过 express框架创建后台项目，连接mysql数据实现用户的登录，注册，数据的增删改查 ,登录的token验证,图片上传,以及日志记录


  * 运行项目

    npm run dev    ==>安装热更新插件 具体内容查看地址 https://www.jianshu.com/p/a030f0d95dfd
    
 * 前端访问地址 [http://zgscmt.qicp.vip](http://zgscmt.qicp.vip/)
 ```
   用户名：admin,
   密码：123456
 ```
 
 文件目录结构
 
```
│  app.js    
│  index.js  //入口文件(bin/www替换index)
│  package-lock.json
│  package.json 
│  web.config  //配置iis服务器文件
│  
├─db
│      db_conn.js //连接数据库
│      sql.js     //sql语句,封装接口方法
│   
|
|—iisnode   //iis服务器安装的日志插件
|
|      index.html  //设置日志文件的样式 
|      WIN-date...  //日志文件
|    
|
├─logs
│  │  log.js    //日志文件
│  │  
│  └─log
│          error.log  //日志记录
│          
├─public
│  ├─images    //本地上传的图片
│  │      1594970306671-u=3633938664,3108122541&fm=26&gp=0.jpg
│  │      1594971583616-下载 (2).jpg
│  │      
│  ├─javascripts 
│  │      common.js   //token失效 返回的错误信息
│  │      
│  └─stylesheets
│          style.css
│          
├─routes
│      index.js   //处理网站数据的增删改查(数据下载的菜鸟教程的websites.sql)
│      upload.js  //文件上传，修改
│      users.js   //用户的 登录，注册接口
│      
├─token
│      token.js  //生成token及token验证
│      
├─views  (没用到)
│      error.jade
│      index.jade  
│      layout.jade
│      
└─第一版 token  (token的处理方式) 
        sql.js
        token.js        
```
