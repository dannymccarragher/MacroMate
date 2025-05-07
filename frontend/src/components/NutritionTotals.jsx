const NutritionTotals = ({ nutritionData = {} }) => {
    const {
        calories = 0,
        carbohydrates = 0,
        protein = 0,
        fats = 0
    } = nutritionData;

    return (
        <div>
            <div><strong>Calories:</strong> {calories} kcal</div>
            <div><strong>Carbs:</strong> {carbohydrates} g</div>
            <div><strong>Protein:</strong> {protein} g</div>
            <div><strong>Fats:</strong> {fats} g</div>
        </div>
    );
};

export default NutritionTotals;
