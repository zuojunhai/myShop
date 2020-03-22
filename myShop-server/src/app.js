'use strict'

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

let app = express()

// 注册 body-parser 中间件
app.use(bodyParser({ extended: false }))
// app.use(bodyParser.urlencoded({ extended: false }));

//1.0 初始化orm
const orm = require('orm')
app.use(
  orm.express('mysql://root:@127.0.0.1:3306/dtcmsdb4', {
    define: function(db, models, next) {
      next()
    }
  })
)

//2.0 将所有api的请求响应content-type设置为application/json
app.all('/api/*', (req, res, next) => {
  //设置允许跨域响应报文头
  //设置跨域
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With"); // X-Requested-With
  //res.header("Access-Control-Allow-Methods", "*");

  res.header('Access-Control-Allow-Origin', '*')
  // 设置服务器支持的所有头信息字段
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  )
  // 设置服务器支持的所有跨域请求的方法
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')

  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  next()
})

//2.0 设置路由规则
const apiRoute = require('./routes/apiRoute.js')
app.use('/', apiRoute)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(8082, () => {
   console.log('vue-cms的api服务已启动, :8082');
});
