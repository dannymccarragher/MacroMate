import { useState, useEffect } from "react";

const FoodDetails = ({ nutrition, onBack, onAdd }) => {
    const [weight, setWeight] = useState(nutrition.weight);
    const [foodData, setFoodData] = useState(nutrition);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    

    console.log("Initial nutrition prop:", nutrition);

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

    let nutritionDisplay = null;
    if (loading) {
        nutritionDisplay = <p>Loading updated nutrition...</p>;
    } else {
        nutritionDisplay = (
            <div>
                <p><strong>Calories:</strong> {Math.round(foodData.nutrients.calories)} kcal</p>
                <p><strong>Carbs:</strong> {Math.round(foodData.nutrients.carbohydrates)} g</p>
                <p><strong>Protein:</strong> {Math.round(foodData.nutrients.protein)} g</p>
                <p><strong>Fats:</strong> {Math.round(foodData.nutrients.fats)} g</p>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header">
                <div className="flex items-center justify-between">
                    <h3>{foodData.food}</h3>
                    <button className="btn btn-secondary" onClick={onBack}>
                        ← Back to Search
                    </button>
                </div>
            </div>

            <div className="card-body">
                <div className="form-group">
                    <label className="form-label">Weight (grams)</label>
                    <input
                        type="number"
                        className="form-input"
                        value={weight}
                        onChange={(e) => setWeight(parseFloat(e.target.value))}
                        placeholder="Enter weight in grams"
                    />
                </div>

                {loading ? (
                    <div className="flex items-center justify-center p-6">
                        <div className="loading-spinner"></div>
                        <span className="ml-3 text-secondary">Loading updated nutrition...</span>
                    </div>
                ) : (
                    <div className="nutrition-card">
                        <div className="card-header">
                            <h4>Nutritional Information</h4>
                            <p className="text-secondary">Per {weight}g serving</p>
                        </div>
                        <div className="card-body">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="nutrition-metric">
                                    <div className="nutrition-icon calories">C</div>
                                    <div className="nutrition-value">
                                        <div className="nutrition-label">Calories</div>
                                        <div className="nutrition-amount">
                                            {Math.round(foodData.nutrients.calories)}
                                            <span className="nutrition-unit">kcal</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="nutrition-metric">
                                    <div className="nutrition-icon carbs">C</div>
                                    <div className="nutrition-value">
                                        <div className="nutrition-label">Carbohydrates</div>
                                        <div className="nutrition-amount">
                                            {Math.round(foodData.nutrients.carbohydrates)}
                                            <span className="nutrition-unit">g</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="nutrition-metric">
                                    <div className="nutrition-icon protein">P</div>
                                    <div className="nutrition-value">
                                        <div className="nutrition-label">Protein</div>
                                        <div className="nutrition-amount">
                                            {Math.round(foodData.nutrients.protein)}
                                            <span className="nutrition-unit">g</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="nutrition-metric">
                                    <div className="nutrition-icon fats">F</div>
                                    <div className="nutrition-value">
                                        <div className="nutrition-label">Fats</div>
                                        <div className="nutrition-amount">
                                            {Math.round(foodData.nutrients.fats)}
                                            <span className="nutrition-unit">g</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {error && <div className="error-message">{error}</div>}

                <div className="flex gap-4 mt-6">
                    <button className="btn btn-primary btn-lg flex-1" onClick={handleAdd}>
                        ➕ Add to Food Log
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;