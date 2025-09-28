const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db');

app.use(express.json());
app.use(express.static('public'));  // เสิร์ฟไฟล์ static เช่น HTML, CSS, JS

// จำลองฐานข้อมูลกระทู้ (ในตัวอย่างนี้ใช้ array)
let threads = [
    { title: 'การตั้งคำถามในเว็บบอร์ด', content: 'วิธีการตั้งคำถามที่ดี' },
    { title: 'การสร้างโปรเจกต์ใน Node.js', content: 'เรียนรู้การสร้างโปรเจกต์พื้นฐาน' }
];

// API สำหรับดึงข้อมูลกระทู้ทั้งหมด
app.get('/api/threads', (req, res) => {
    res.json(threads);
});

// API สำหรับสร้างกระทู้ใหม่
app.post('/api/threads', (req, res) => {
    const { title, content } = req.body;
    threads.push({ title, content });
    res.status(201).json({ title, content });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get('/api/threads', (req, res) => {
    db.query('SELECT * FROM threads', (err, result) => {
        if (err) {
            return res.status(500).send('Error retrieving threads');
        }
        res.json(result);
    });
});