

const NutritionLog = ({ entries, onDelete }) => {

    
    return (
        <div>
            {entries.map((item, index) => (
                <div key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
                    <h4>{item.food}</h4>
                    <p><strong>Calories:</strong> {item.nutrients.calories} kcal</p>
                    <p><strong>Carbs:</strong> {item.nutrients.carbohydrates} g</p>
                    <p><strong>Protein:</strong> {item.nutrients.protein} g</p>
                    <p><strong>Fats:</strong> {item.nutrients.fats} g</p>
                    <button onClick={() => onDelete(index)}>Delete Food</button>
                </div>
            ))}
        </div>
    );
};

export default NutritionLog;
