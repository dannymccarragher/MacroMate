import express from "express";
import controller from "../controllers/controller.js";
import foodEntriesRoutes from "../routes/foodEntries.js";

const router = express.Router();

// Food search routes
router.get('/search', controller.fetchData);
router.get('/suggest', controller.suggestFoods);

// Food entries routes
router.use('/food-entries', foodEntriesRoutes);

export default router;