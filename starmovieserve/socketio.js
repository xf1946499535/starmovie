//后端socketio
let socketio = {}
//因为需要用到数据库。所以要引入sql
let sqlQuery = require('./module/lcMysql')
//拿到www中的io并使用，因为这个函数是在www中被调用的，所以拿的socketio.io中
//的io是www中的
function getSocket(server) {
    //解决客户端和服务器的跨域问题
    socketio.io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    let io = socketio.io;
    io.on('connection', function (socket) {
        console.log(socket.id + "连接服务器");
        // //接受登陆事件
        socket.on('login', async function (user) {
            //修改数据库登录信息(socketid,isonline)
            //设置数据库更新语句
            let sqlStr = "update user set socketid=? where userName=?"
            sqlQuery(sqlStr, [socket.id, user.userName])
        })
        //监听用户断开连接事件 
        socket.on('disconnect', function (data) {
            console.log("正在断开连接");
            let sqlStr = "update user set socketid=? where socketid=?"
            sqlQuery(sqlStr, [null, socket.id]).catch((err) => {
                console.log(err);
            })
        })
        //加入房间
        socket.on("joinvh", function (vhsocket, me) {
            socket.join(vhsocket); // join(房间名)加入房间
            console.log(me.userName + "进入房间");
            socket.broadcast.to(vhsocket).emit('joinvh', vhsocket, me.userName);
        });
        //监听影院接入事件，告知大家我是谁
        socket.on('tell', async function (me) {
            console.log("我是" + me.userName);
        })

        //管理,播放电影
        socket.on("ctstart", function (vhsocket) {
            socket.join(vhsocket); // join(房间名)加入房间
            socket.broadcast.to(vhsocket).emit('startmovie');
            // console.log(vhsocket);
            // socket.leave(vhsocket);
        });
        //管理,关闭电影
        socket.on("ctend", function (vhsocket) {
            socket.join(vhsocket); // join(房间名)加入房间
            socket.broadcast.to(vhsocket).emit('endmovie');
        });
    });
}
socketio.getSocket = getSocket;
module.exports = socketio