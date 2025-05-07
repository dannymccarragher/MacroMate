import { useState, useEffect } from "react";

const FoodDetails = ({ nutrition, onBack, onAdd }) => {
    const [weight, setWeight] = useState(nutrition.weight);
    const [foodData, setFoodData] = useState(nutrition);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Auto-refresh nutrients when weight changes
    useEffect(() => {
        const fetchUpdatedNutrition = async () => {
            if (!foodData.food || isNaN(weight)) return;

            setLoading(true);
            try {
                const url = `http://localhost:3000/search?food=${encodeURIComponent(foodData.food)}&weight=${weight}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to update nutrition data");
                const data = await response.json();
                setFoodData(data);
                setError("");
            } catch (err) {
                setError("Could not update nutrition info");
            } finally {
                setLoading(false);
            }
        };

        fetchUpdatedNutrition();
    }, [weight]);

    const handleAdd = () => {
        onAdd({ ...foodData, weight });
    };

    return (
        <div>
            <button onClick={onBack}>← Back to Search</button>
            <h3>{foodData.food}</h3>

            <label>
                Weight:
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    style={{ marginLeft: "8px" }}
                />
                <span> g</span>
            </label>

            {loading ? (
                <p>Loading updated nutrition...</p>
            ) : (
                <div>
                    <p><strong>Calories:</strong> {foodData.nutrients.calories} kcal</p>
                    <p><strong>Carbs:</strong> {foodData.nutrients.carbohydrates} g</p>
                    <p><strong>Protein:</strong> {foodData.nutrients.protein} g</p>
                    <p><strong>Fats:</strong> {foodData.nutrients.fats} g</p>
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button onClick={handleAdd} style={{ marginTop: "10px" }}>
                ➕ Add Food
            </button>
        </div>
    );
};

export default FoodDetails;
