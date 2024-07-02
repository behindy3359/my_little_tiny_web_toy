const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('view engine','ejs');
app.set('views','views');

let userCount = 0;

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  userCount++;
  socket.nickname = `user${userCount}`;
  
  console.log('사용자 연결됨:', socket.nickname);
  
  socket.emit('set nickname', socket.nickname);
  
  socket.on('chat message', (data) => {
    io.emit('chat message', {
      nickname: data.nickname || socket.nickname,
      message: data.message
    });
  });

  socket.on('disconnect', () => {
    console.log('사용자 연결 해제:', socket.nickname);
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});