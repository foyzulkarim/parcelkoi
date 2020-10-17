import express from "express";
import { saveUser, getAllUsers, update, deleteById, getUserById } from "../services/userService";
import validators from "../models/view-models";
import { handleValidation } from "../middlewares";
import { NotFound } from '../utils/errors';

const router = express.Router();

const getHandler = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.status(200).send(users);
    } catch (error) {
        return next(error, req, res);
    }
};

const getByIdHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await getUserById(id);
        if (user) {
            res.status(200).send(user);
        }
        else {
            throw new NotFound('User not found by the id: ' + id);
        }
    } catch (error) {
        return next(error, req, res);
    }
};

const postHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const id = await saveUser(body);
        res.status(201).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

const putHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const id = await update(body);
        res.status(200).send(id);
    } catch (error) {
        return next(error, req, res);
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteById(id);
        res.status(200).send("User deleted");
    } catch (error) {
        return next(error, req, res);
    }
}

router.get('/', getHandler);
router.get('/:id', getByIdHandler);
router.post('/', handleValidation(validators.userSchemaValidate), postHandler);
router.put('/', putHandler);
router.delete('/:id', deleteHandler);


export default router;