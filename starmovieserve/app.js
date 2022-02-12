var createError = require('http-errors');
var express = require('express');
var path = require('path');
//跨域资源请求
const cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var history = require('connect-history-api-fallback');

//此处需要进行mysql连接操作，已安装mysql模块，，
var sqlQuery = require('./module/lcMysql')

var app = express();

app.use(history());

//跨域资源请求
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//////////////////api所需接口
//////////////////

///////////
/////////
///////////
////////////////////vh
///////////
/////////

//根据用户id返回其可进入的厅的信息
app.get('/vh/vhlist', async function (data, res) {
  let sqlStr = "SELECT distinct * FROM `book` LEFT JOIN `movie` USING(mName) LEFT JOIN `session` USING(sessionId) LEFT JOIN `vh` on vh.vhid=session.vh WHERE book.userId=? AND session.state LIKE 'now' GROUP BY movie.mName"
  let result = await sqlQuery(sqlStr, [data.query.userId])
  res.json(Array.from(result))
})

//当前正在上映的所有影厅
app.get('/vh/ct_vhlist', async function (data, res) {
  let sqlStr = "SELECT distinct * FROM `session` LEFT JOIN `movie` USING(mName) LEFT JOIN `vh` on vh.vhid=session.vh WHERE session.state LIKE 'now'"
  let result = await sqlQuery(sqlStr)
  res.json(Array.from(result))
})



///
///
/////////order
///
///

//axio，提交购物车订单
app.get('/order/add', async function (data, res) {

  var d = JSON.parse(data.query.orderD);
  let sqlStr = "INSERT into goodorder(goodName,goodCount,goodPrice,userID,pic,time) values(?,?,?,?,?,?)"
  for (let i = 0; i < d.length; i++) {
    sqlQuery(sqlStr, [d[i].goodName, d[i].goodCount, d[i].goodPrice, d[i].userID, d[i].pic, d[i].time])
  }
  /* console.log(JSON.parse(data.query.orderD)); */
})



//退出购物车保存修改的数量
app.get('/gwc/updateNum', async function (data, res) {
  var goodinfo = JSON.parse(data.query.goods);
  let sqlStr = "update gwc set goodName=?,goodCount=?,goodPrice=?,userID=?,pic=? where gwcId=?"
  for (let i = 0; i < goodinfo.length; i++) {
    sqlQuery(sqlStr, [goodinfo[i].goodName, goodinfo[i].goodCount, goodinfo[i].goodPrice, goodinfo[i].userID, goodinfo[i].pic, goodinfo[i].gwcId])
  }
})



/////
///
/////////book
///
///

//返回单个用户电影订单
app.get('/book/UserId', async function (data, res) {
  let sqlStr = "SELECT distinct * FROM `book` LEFT JOIN `movie` USING(mName) LEFT JOIN `session` USING(sessionId) WHERE book.userId=?"
  let result = await sqlQuery(sqlStr, [data.query.userId])
  res.json(Array.from(result))
})



/////
///
/////////
///
///

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});














///////////////////
/////////////////



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;