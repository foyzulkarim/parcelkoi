const express = require('express')
const app = express()
var jwt = require('express-jwt');

const port = 3000

app.get('/protected',
    jwt({ secret: 'secret', algorithms: ['HS256'] }),
    function (req, res) {
        console.log(req.user);
        if (!req.user.role) return res.sendStatus(401);
        res.sendStatus(200);
    });

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
