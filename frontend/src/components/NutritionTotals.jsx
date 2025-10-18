const NutritionTotals = ({ nutritionData = {} }) => {
    const {
        calories = 0,
        carbohydrates = 0,
        protein = 0,
        fats = 0
    } = nutritionData;

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="nutrition-metric">
                <div className="nutrition-icon calories">🔥</div>
                <div className="nutrition-value">
                    <div className="nutrition-label">Calories</div>
                    <div className="nutrition-amount">
                        {Math.round(calories)}
                        <span className="nutrition-unit">kcal</span>
                    </div>
                </div>
            </div>

            <div className="nutrition-metric">
                <div className="nutrition-icon carbs">🍞</div>
                <div className="nutrition-value">
                    <div className="nutrition-label">Carbs</div>
                    <div className="nutrition-amount">
                        {Math.round(carbohydrates)}
                        <span className="nutrition-unit">g</span>
                    </div>
                </div>
            </div>

            <div className="nutrition-metric">
                <div className="nutrition-icon protein">🥩</div>
                <div className="nutrition-value">
                    <div className="nutrition-label">Protein</div>
                    <div className="nutrition-amount">
                        {Math.round(protein)}
                        <span className="nutrition-unit">g</span>
                    </div>
                </div>
            </div>

            <div className="nutrition-metric">
                <div className="nutrition-icon fats">🥑</div>
                <div className="nutrition-value">
                    <div className="nutrition-label">Fats</div>
                    <div className="nutrition-amount">
                        {Math.round(fats)}
                        <span className="nutrition-unit">g</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NutritionTotals;
