import { Flame, Wheat, Drumstick, Droplet } from "lucide-react";

const NutritionTotals = ({ nutritionData = {}, goals = {} }) => {
    const {
        calories = 0,
        carbohydrates = 0,
        protein = 0,
        fats = 0
    } = nutritionData;

    const {
        calories: caloriesGoal = 2000,
        carbs: carbsGoal = 250,
        protein: proteinGoal = 150,
        fat: fatGoal = 65
    } = goals;

    const getPercentage = (current, goal) => {
        return goal > 0 ? Math.round((current / goal) * 100) : 0;
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="nutrition-metric">
                <div className="nutrition-icon calories"><Flame /></div>
                <div className="nutrition-value">
                    <div className="nutrition-label">Calories</div>
                    <div className="nutrition-amount">
                        {Math.round(calories)} / {caloriesGoal}
                        <span className="nutrition-unit">kcal</span>
                    </div>
                    <div className="nutrition-progress">
                        <div
                            className="nutrition-progress-bar calories"
                            style={{ width: `${Math.min(getPercentage(calories, caloriesGoal), 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="nutrition-metric">
                <div className="nutrition-icon carbs"><Wheat /></div>
                <div className="nutrition-value">
                    <div className="nutrition-label">Carbs</div>
                    <div className="nutrition-amount">
                        {Math.round(carbohydrates)} / {carbsGoal}
                        <span className="nutrition-unit">g</span>
                    </div>
                    <div className="nutrition-progress">
                        <div
                            className="nutrition-progress-bar carbs"
                            style={{ width: `${Math.min(getPercentage(carbohydrates, carbsGoal), 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="nutrition-metric">
                <div className="nutrition-icon protein"><Drumstick /></div>
                <div className="nutrition-value">
                    <div className="nutrition-label">Protein</div>
                    <div className="nutrition-amount">
                        {Math.round(protein)} / {proteinGoal}
                        <span className="nutrition-unit">g</span>
                    </div>
                    <div className="nutrition-progress">
                        <div
                            className="nutrition-progress-bar protein"
                            style={{ width: `${Math.min(getPercentage(protein, proteinGoal), 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="nutrition-metric">
                <div className="nutrition-icon fats"><Droplet /></div>
                <div className="nutrition-value">
                    <div className="nutrition-label">Fats</div>
                    <div className="nutrition-amount">
                        {Math.round(fats)} / {fatGoal}
                        <span className="nutrition-unit">g</span>
                    </div>
                    <div className="nutrition-progress">
                        <div
                            className="nutrition-progress-bar fats"
                            style={{ width: `${Math.min(getPercentage(fats, fatGoal), 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NutritionTotals;
