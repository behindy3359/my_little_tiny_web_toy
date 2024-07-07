require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

// 404 에러 핸들링
app.use((req, res, next) => {
  res.status(404).render('404', { url: req.url });
});

// 서버 에러 (500) 핸들링
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500');
});

app.listen(port, () => {
  console.log(`서버가 시작되었습니다. (포트: ${port})`);
});