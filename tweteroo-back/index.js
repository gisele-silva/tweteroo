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
    
    if (!avatar || !username){
        res.status(400).send("Todos os campos são obrigatórios");
    } else {
        res.status(201).send("ok")
    }
})

app.post('/tweets', (req, res) => {
    
    const { username, tweet } = req.body;
    const { avatar } = users.find(user => user.username === username);
    tweets.push ({username, tweet, avatar})

    if (!avatar || !tweet){
        res.status(400).send("Todos os campos são obrigatórios");
    } else {
        res.status(201).send("ok")
    }
})

app.get('tweets/:username', (req, res) => {
    const { username } = req.params
    const tweetsUser = tweets.filter(t => t.username === username)
    res.status(200).send(tweetsUser)
})

app.get('/tweets', (req, res) => {
    const { page } = req.query;
    if (page && page < 1) {
        res.status(400).send('Página inválida');
        return;
    }
    if (tweets.length <= 10) {
        const last10Tweets = tweets.slice(-10).reverse()
        return res.send(last10Tweets)
    }

    res.status(200).send([...tweets].reverse().slice((page-1)*10, page*10));
    
})


app.listen(5000, () => {
    console.log(chalk.bold("Servidor funcionando normalmente"))
})

