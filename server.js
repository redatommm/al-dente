const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors'); // Добавьте этот импорт

const app = express();
const port = 3000;

const TELEGRAM_API_URL = 'https://api.telegram.org/bot5422387748:AAF9hSOLtISqFDCVHYRjDZ6WSv1KE1tid3k/sendMessage';
const CHAT_ID = '790005263';

app.use(cors()); // Включите CORS
app.use(bodyParser.json());

app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    console.log('Полученные данные:', req.body);

    const text = `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`;

    axios.post(TELEGRAM_API_URL, {
        chat_id: CHAT_ID,
        text: text
    })
    .then(response => {
        console.log('Ответ от Telegram:', response.data);
        res.json({ success: true });
    })
    .catch(error => {
        console.error('Ошибка при отправке в Telegram:', error);
        res.json({ success: false, error: error.message });
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

