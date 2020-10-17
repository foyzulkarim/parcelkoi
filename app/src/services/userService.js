import models from "../models/data-models";
import { UserViewModel } from "../models/view-models/user-view-model";
import { NotFound } from "../utils/errors";

export const getAllUsers = async () => {
    const User = models.User;
    const users = await User.find();
    let userViewModels = users.map(user => new UserViewModel(user));
    return userViewModels;
}

export const saveUser = async (user) => {
    const model = new models.User(user);
    const savedUser = await model.save();
    return savedUser;
};

export const update = async (user) => {
    const id = user._id;
    const User = models.User;
    let model = await User.findById(id);
    if (model) {
        model.username = user.username;
        model.save();
        return model;
    }

    throw new NotFound('User not found by the id: ' + id);
}

export const deleteById = async (id) => {
    const User = models.User;
    let model = await User.findById(id);
    if (model) {
        let result = await User.deleteOne({ _id: id });
        return result;
    }

    throw new NotFound('User not found by the id: ' + id);
}

export const getUserById = async (id) => {
    const User = models.User;
    let model = await User.findById(id);
    return model;
}