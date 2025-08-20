
import { Router } from 'express';
import authRouter from "./auth.routes.mjs";

const rootRouter = Router();

rootRouter.get('/', (req, res) => {
    res.send('Welcome to the API');
});
rootRouter.use('/auth', authRouter);


export default rootRouter;