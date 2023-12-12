import express from 'express';
import reviews from "./reviews.router.js";

router.use("./reviews",reviews);

const router =express.Router();

