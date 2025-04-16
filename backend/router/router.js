import express from "express";
import controller from "../controllers/controller.js";

const router = express.Router();

// router.get('/home', controller.renderHome);
router.get('/search', controller.fetchData);
router.get('/suggest', controller.suggestFoods);

export default router;