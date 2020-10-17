import userRoutes from "./userController";

const configure = (app) => {
    app.use('/users', userRoutes);
}

export default configure;