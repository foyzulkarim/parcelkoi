import express from "express";

const port = 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {    
    res.send('hello viewers '+ req.query.id);
});

app.post('/', (req, res) => {
    const body = req.body;
    res.send('hello viewers this is post '+ body.message);
})

app.listen(port, () => {
    console.log("Listening to port " + port);
});

/*
1. up and running the express server
2. configure the express server
3. handle the routes of the server
*/