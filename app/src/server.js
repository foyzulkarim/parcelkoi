import app from "./app";
import { connectWithDb, mongodb_uri } from "./mongo";
import { errorLogger, infoLogger } from "./logger";

const port = 3000;

app.listen(port, () => {

    connectWithDb();

    if (process.env.ENVIRONMENT != 'TEST')
        app.use(errorLogger(mongodb_uri()));


    console.log('app is running on port', port);
});