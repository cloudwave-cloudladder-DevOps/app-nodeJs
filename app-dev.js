const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const pool = require('./db');

require('dotenv').config();
const spring = process.env.SPRING_ORDER_LB_SERVICE_HOST;

const http = require('http');
const { hostname } = require('os');

const app = express();
const router = express.Router();
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});
router.get('/health', (req, res) => {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    }
    res.status(200).send(data);
});
app.use('/', router);


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('signin');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/signin', (req, res) => {
    res.render('signin');
});

app.get('/order', (req, res) => {
    res.render('order');
});

async function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

app.post('/signup', async (req, res) => {
    try {
        const { userPhone, userName, userPw } = req.body;
        const sql = 'INSERT INTO member (phoneNumber, name, password) VALUES (?, ?, ?)';
        await query(sql, [userPhone, userName, userPw]);
        res.json({ code: 200, message: '회원가입에 성공했습니다.' });
    } catch (err) {
        console.log(err);
        res.json({ code: 404, message: '에러가 발생했습니다.' });
    }
});

app.post('/signin', async (req, res) => {
    try {
        const { userPhone, userPw } = req.body;
        const result = await query('SELECT phoneNumber, password FROM member WHERE phoneNumber = ?', [userPhone]);
        if (result.length === 0) return res.json({ code: 204, message: '존재하지 않는 계정입니다.' });
        if (userPw !== result[0].password) return res.json({ code: 204, message: '비밀번호가 일치하지 않습니다.' });
        
        res.json({ code: 200, message: '로그인 성공!', redirectLink: '/order' });

    } catch (err) {
        console.log(err);
        res.json({ code: 404, message: '에러가 발생했습니다.' });
    }
});

app.post('/send-order', async (req, res) => {
    const { breadName, breadCategory } = req.body;
    
    try {
        const springResponse = await axios.post(`http://${spring}/api/v1/order`, {
            breadName,
            breadCategory
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        res.json(springResponse.data);
    } catch (error) {
        console.error('spring 서비스 요청 실패:', error);
        res.status(500).json({ message: 'Spring 서비스 요청 실패' });
    }
});

app.get('/hpa', (req, res) => {
    let x = 0.0001;
    let hostname = "";
    for (i=0; i<=1000000; i++) {
        x += Math.sqrt(x);
    }
    try {
        hostname = "성공";
    } catch (error) {
        hostname = "실패";
    }
    res.send(hostname);
});

app.listen(3000, () => {
    console.log('서버가 실행 중입니다. 3000 포트로!');
});
