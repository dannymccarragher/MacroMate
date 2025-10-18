import { useState, useEffect } from "react";
import { Plus, Utensils, Settings } from "lucide-react";
import NutritionTotals from "./NutritionTotals";
import NutritionLog from "./NutritionLog";
import FoodSearchModal from "./FoodSearchModal";
import SetGoals from "./SetGoals";

const NutritionDashboard = () => {
    const [diary, setDiary] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
    const [goals, setGoals] = useState({
        calories: 2000,
        protein: 150,
        carbs: 250,
        fat: 65
    });

    // Load diary from localStorage on component mount
    useEffect(() => {
        const savedDiary = localStorage.getItem('nutritionDiary');
        if (savedDiary) {
            setDiary(JSON.parse(savedDiary));
        }
    }, []);

    // Load goals from localStorage on component mount
    useEffect(() => {
        const savedGoals = localStorage.getItem('nutritionGoals');
        if (savedGoals) {
            setGoals(JSON.parse(savedGoals));
        }
    }, []);

    // Save diary to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('nutritionDiary', JSON.stringify(diary));
    }, [diary]);

    // Save goals to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('nutritionGoals', JSON.stringify(goals));
    }, [goals]);

    const handleDelete = (indexToDelete) => {
        if (indexToDelete >= 0 && indexToDelete < diary.length) {
            const updatedDiary = diary.filter((_, i) => i !== indexToDelete);
            setDiary(updatedDiary);
        }
    };

    const handleAddFood = (foodData) => {
        setDiary(prev => [...prev, foodData]);
        setIsModalOpen(false);
    };

    const handleSaveGoals = (newGoals) => {
        setGoals({
            calories: Number(newGoals.calories) || 2000,
            protein: Number(newGoals.protein) || 150,
            carbs: Number(newGoals.carbs) || 250,
            fat: Number(newGoals.fat) || 65
        });
        setIsGoalsModalOpen(false);
    };

    const calculateTotals = () => {
        return diary.reduce((totals, item) => {
            totals.calories += item.nutrients.calories || 0;
            totals.carbohydrates += item.nutrients.carbohydrates || 0;
            totals.protein += item.nutrients.protein || 0;
            totals.fats += item.nutrients.fats || 0;
            return totals;
        }, { calories: 0, carbohydrates: 0, protein: 0, fats: 0 });
    };

    const totals = calculateTotals();

    return (
        <div className="grid gap-6">
            {/* Header Section */}
            <div className="card">
                <div className="card-header">
                    <h2>Today's Nutrition</h2>
                    <p className="text-secondary">Track your daily macronutrient intake</p>
                </div>
                <div className="card-body">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-lg font-semibold">Daily Totals</h3>
                            <p className="text-sm text-gray-600">Your nutrition summary for today</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setIsGoalsModalOpen(true)}
                            >
                                <Settings /> Set Goals
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Plus /> Add Food
                            </button>
                        </div>
                    </div>
                    <NutritionTotals nutritionData={totals} goals={goals} />
                </div>
            </div>

            {/* Food Log Section */}
            {diary.length > 0 && (
                <div className="card">
                    <div className="card-header">
                        <h3>Food Log</h3>
                        <p className="text-secondary">Your meals and snacks for today</p>
                    </div>
                    <div className="card-body">
                        <NutritionLog entries={diary} onDelete={handleDelete} />
                    </div>
                </div>
            )}

            {/* Empty State */}
            {diary.length === 0 && (
                <div className="card">
                    <div className="empty-state">
                        <div className="empty-state-icon"><Utensils size={48} /></div>
                        <h3 className="empty-state-title">Start Your Nutrition Journey</h3>
                        <p className="empty-state-description">
                            Click "Add Food" above to begin tracking your daily nutrition intake.
                        </p>
                        <button
                            className="btn btn-primary mt-4"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Add Your First Food
                        </button>
                    </div>
                </div>
            )}

            {/* Food Search Modal */}
            <FoodSearchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddFood={handleAddFood}
            />

            {/* Goals Modal */}
            {isGoalsModalOpen && (
                <div className="modal-overlay" onClick={() => setIsGoalsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Set Your Daily Goals</h3>
                            <button className="modal-close" onClick={() => setIsGoalsModalOpen(false)}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <SetGoals onSave={handleSaveGoals} currentGoals={goals} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NutritionDashboard;
