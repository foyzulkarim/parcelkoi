import express from "express";
import models from "../models";
import { saveUser, getAllUsers } from "../services/userService";

const router = express.Router();

const getHandler = async (req, res) => {
    const users = await getAllUsers();
    res.send(users);
};

const postHandler = async (req, res) => {
    const body = req.body;
    const user = await saveUser(body);
    res.send(user._id);
};

router.get('/', getHandler);
router.post('/', postHandler);


const configure = (app) => {
    app.use('/users', router);
}

export default configure;