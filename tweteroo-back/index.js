import chalk from "chalk";
import express from "express";
import cors from "cors";
import axios from "axios";
const app = express()
const users = []
const tweets = []

app.use(express.json())
app.use(cors())

app.post('/sign-up', (req, res) => {
    const dados = req.body
    let username = dados.username
    let avatar = dados.avatar
    users.push ({username, avatar})
    res.send("ok")
})

app.post('/tweet', (req, res) => {
    const dados = req.body;
    let username = dados.username;
    let tweet = dados.tweet;
    const { avatar } = users.find(user => user.username === username);
    tweets.push ({username, tweet, avatar})
    res.send("ok")
})

app.get('/tweets', (req, res) => {
   res.send(tweets)
})

app.listen(5000, () => {
    console.log(chalk.bold("Servidor funcionando normalmente"))
})

