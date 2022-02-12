//前端socketio
import io from 'socket.io-client'

//与服务器建立socketio连接
let socket = io.connect("http://139.155.247.54:3000", {
    'force new connection': true
});
export default socket;