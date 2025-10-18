import express from 'express';
import foodEntriesService from '../services/foodEntries.js';

const router = express.Router();

// Add a new food entry
router.post('/', async (req, res) => {
    try {
        // For now, no user authentication - using null as userId
        const foodEntry = await foodEntriesService.addFoodEntry(null, req.body);
        res.status(201).json(foodEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get food entries for today
router.get('/', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const entries = await foodEntriesService.getUserFoodEntries(null, today);
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get food entries for a specific date
router.get('/date/:date', async (req, res) => {
    try {
        const { date } = req.params;
        const entries = await foodEntriesService.getUserFoodEntries(null, date);
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a food entry
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await foodEntriesService.deleteFoodEntry(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router; 