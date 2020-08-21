import models from "../models";

export const saveUser = async (user) => {
    const model = new models.User({ username: user.username, createdAt: new Date() });
    const savedUser = await model.save();
    return savedUser;
};

export const getAllUsers = async () => {
    const User = models.User;
    const users = await User.find();
    return users;
}