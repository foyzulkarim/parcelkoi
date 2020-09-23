import configureUserController from "./userController";

const configure = (app) => {
    console.log('configure\t', process.env.DB_USER);
    configureUserController(app);
}

export default configure;