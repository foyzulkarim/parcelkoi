import express from "express";
import configure from "./controllers";
import connectWithDb from "./mongo";
import { handleErrors } from "./middlewares/handleErrors";

const port = 3000;
const app = express();

app.use(express.json());

connectWithDb();

configure(app);

app.use(handleErrors);

app.listen(port, () => {
    console.log("Listening to port " + port);
});

/*
1. up and running the express server
2. configure the express server
3. handle the routes of the server

- use directory import
- use async awaiimport { handleErrors } from './middlewares/handleErrors';
t function

- 3 layer architecture
    UserController = controller layer : process the http requests
    UserService = service layer : process the object and send to data layer
    Mongoose wrapper = data layer : process the data and get/set it to database 

*/