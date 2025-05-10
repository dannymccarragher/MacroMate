import { useState, useEffect } from "react";

const FoodDetails = ({ nutrition, onBack, onAdd }) => {
    const [weight, setWeight] = useState(nutrition.weight);
    const [foodData, setFoodData] = useState(nutrition);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isCustom, setIsCustom] = useState(false);
    const [inputType, setInputType] = useState('oneServing');

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
        <div>
            <button onClick={onBack}>← Back to Search</button>
            <h3>{foodData.food}</h3>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <select
                    value={inputType}
                    onChange={(e) => {
                        setInputType(e.target.value);
                        if (e.target.value === 'oneServing') {
                            setWeight(foodData.servingSize);
                        } else {
                            setWeight('');
                        }
                    }}
                >
                    <option value="oneServing">One Serving Size ({foodData.servingSize}g)</option>
                    <option value="grams">Grams</option>
                    <option value="servings">Servings</option>
                </select>

                {inputType === 'grams' && (
                    <>
                        <input
                            type="number"
                            placeholder="Enter grams"
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value)) {
                                    setWeight(value);
                                }
                            }}
                        />
                        <span>g</span>
                    </>
                )}

                {inputType === 'servings' && (
                    <>
                        <input
                            type="number"
                            placeholder="Enter servings"
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value)) {
                                    setWeight(value * foodData.servingSize);
                                }
                            }}
                        />
                        <span>servings</span>
                    </>
                )}
            </div>

            {nutritionDisplay}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button onClick={handleAdd} style={{ marginTop: "10px" }}>
                ➕ Add Food
            </button>
        </div>
    );
};

export default FoodDetails;