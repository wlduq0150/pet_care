import express from 'express';
import {reviewRouter} from "./reviews.router.js";

const apiRouter =express.Router();

apiRouter.use("/reviews",reviewRouter);


export {apiRouter};