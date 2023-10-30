require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_API_TOKEN
const chat_id = process.env.TELEGRAM_CHAT_ID
const port = process.env.PORT

const bot = new TelegramBot(token, {polling: true});

/*
{
    photo: url(string),
    title: string,
    url: string
}
*/

app.post('/send', async (req, res, next) => {
    try {
        await bot.sendPhoto(chat_id, req.body.photo, { caption: `<a href="${req.body.url}">${req.body.title}</a>`, parse_mode: 'HTML' })

        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
