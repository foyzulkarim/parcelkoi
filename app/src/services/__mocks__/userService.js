import models from "../../models";

let users = [{
    'id': '1', 'username': 'test001'
}];

export const getAllUsers = async () => {
    return users;
}

export const saveUser = async (user) => {
    const model = new models.User(user);
    users.push(model);
    return model;
};

export const getUserById = async (id) => {
    let model = users.find(x => x.id === id);
    return model;
}