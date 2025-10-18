import { Op } from 'sequelize';
import FoodEntry from '../models/FoodEntry.js';
import DailyTotal from '../models/DailyTotal.js';
import sequelize from 'sequelize';

const foodEntriesService = {
    // Add a new food entry
    async addFoodEntry(userId, foodData) {
        try {
            const foodEntry = await FoodEntry.create({
                user_id: userId,
                ...foodData
            });

            await this.updateDailyTotals(userId);
            return foodEntry;
        } catch (error) {
            throw new Error(`Error adding food entry: ${error.message}`);
        }
    },

    // Get food entries for a user
    async getUserFoodEntries(userId, date) {
        try {
            const whereClause = {
                entry_date: {
                    [Op.between]: [
                        new Date(date + ' 00:00:00'),
                        new Date(date + ' 23:59:59')
                    ]
                }
            };

            // Only filter by user_id if provided
            if (userId !== null) {
                whereClause.user_id = userId;
            }

            const entries = await FoodEntry.findAll({
                where: whereClause,
                order: [['entry_date', 'DESC']]
            });
            return entries;
        } catch (error) {
            throw new Error(`Error fetching food entries: ${error.message}`);
        }
    },

    // Delete a food entry
    async deleteFoodEntry(entryId) {
        try {
            const deleted = await FoodEntry.destroy({
                where: { id: entryId }
            });

            if (!deleted) {
                throw new Error('Food entry not found');
            }

            return { success: true };
        } catch (error) {
            throw new Error(`Error deleting food entry: ${error.message}`);
        }
    },

    // Update daily totals
    async updateDailyTotals(userId) {
        try {
            const today = new Date().toISOString().split('T')[0];

            const whereClause = {
                entry_date: {
                    [Op.between]: [
                        new Date(today + ' 00:00:00'),
                        new Date(today + ' 23:59:59')
                    ]
                }
            };

            // Only filter by user_id if provided
            if (userId !== null) {
                whereClause.user_id = userId;
            }

            const totals = await FoodEntry.findAll({
                attributes: [
                    [sequelize.fn('SUM', sequelize.col('calories')), 'total_calories'],
                    [sequelize.fn('SUM', sequelize.col('carbohydrates')), 'total_carbohydrates'],
                    [sequelize.fn('SUM', sequelize.col('protein')), 'total_protein'],
                    [sequelize.fn('SUM', sequelize.col('fats')), 'total_fats']
                ],
                where: whereClause
            });

            if (totals.length > 0) {
                const total = totals[0];
                await DailyTotal.upsert({
                    user_id: userId,
                    date: today,
                    total_calories: total.getDataValue('total_calories'),
                    total_carbohydrates: total.getDataValue('total_carbohydrates'),
                    total_protein: total.getDataValue('total_protein'),
                    total_fats: total.getDataValue('total_fats')
                });
            }
        } catch (error) {
            throw new Error(`Error updating daily totals: ${error.message}`);
        }
    },

    // Get daily totals for a user
    async getDailyTotals(userId, date) {
        try {
            const totals = await DailyTotal.findOne({
                where: {
                    user_id: userId,
                    date: date
                }
            });
            return totals;
        } catch (error) {
            throw new Error(`Error fetching daily totals: ${error.message}`);
        }
    }
};

export default foodEntriesService; 