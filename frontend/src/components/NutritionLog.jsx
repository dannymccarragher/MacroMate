

const NutritionLog = ({ entries }) => {
    return (
        <div>
            {entries.map((item, index) => (
                <div key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
                    <h4>{item.food}</h4>
                    <p><strong>Weight:</strong> {item.weight}g</p>
                    <p><strong>Calories:</strong> {item.nutrients.calories} kcal</p>
                    <p><strong>Carbs:</strong> {item.nutrients.carbohydrates} g</p>
                    <p><strong>Protein:</strong> {item.nutrients.protein} g</p>
                    <p><strong>Fats:</strong> {item.nutrients.fats} g</p>
                </div>
            ))}
        </div>
    );
};

export default NutritionLog;
