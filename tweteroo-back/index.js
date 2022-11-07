import chalk from "chalk";
import express from "express";
import cors from "cors";

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

app.listen(5000, () => {
    console.log(chalk.bold("Servidor funcionando normalmente"))
})