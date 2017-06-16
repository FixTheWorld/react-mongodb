const express = require('express');
const path = require('path');
const index = require('./routes/index');
const app = express();
const devMiddleWare=require("webpack-dev-middleware");
const hotMiddleWare=require("webpack-hot-middleware");
const webpack=require("webpack");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const webpackConfig=require("./config/webpack.config");
const compiler=webpack(webpackConfig);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html',require('ejs').__express);//用engine方法注册模板引擎后缀名
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));
app.use('/', index);
app.use(devMiddleWare(compiler,{
    stats:{colors:true}
}));
app.use(hotMiddleWare(compiler));
module.exports = app;
