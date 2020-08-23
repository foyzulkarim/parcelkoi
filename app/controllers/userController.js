import express from "express";
import { saveUser, getAllUsers, update, deleteById } from "../services/userService";

const router = express.Router();

const getHandler = async (req, res) => {
    const users = await getAllUsers();
    res.status(200).send(users);
};

const postHandler = async (req, res) => {
    const body = req.body;
    const user = await saveUser(body);
    res.status(201).send(user._id);
};

const putHandler = async (req, res) => {
    const body = req.body;    
    const user = await update(body);
    res.status(200).send(user._id);
}

const deleteHandler = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send('Id not provided');
    }
    await deleteById(id);
    res.status(200).send("User deleted");
}

router.get('/', getHandler);
router.post('/', postHandler);
router.put('/', putHandler);
router.delete('/:id', deleteHandler);


const configure = (app) => {
    app.use('/users', router);
}

export default configure;