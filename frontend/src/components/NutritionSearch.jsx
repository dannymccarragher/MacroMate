import { useState } from "react";
import NutritionTotals from "./NutritionTotals";

const NutritionSearch = () => {
    const [food, setFood] = useState("");
    const [weight, setWeight] = useState(100);
    const [nutrition, setNutrition] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        try {
            const url = `http://localhost:3000/search?food=${food}&weight=${weight}`;

            const config = {
                method: 'GET',
                mode: 'cors'
            };

            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error("No data found or API error.");
            }

            const data = await response.json();
            setNutrition(data);
            setError("");
        } catch (err) {
            setError(err.message);
            setNutrition(null);
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Enter food name"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                />
                <div>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <span>g</span>
                </div>
                <button onClick={handleSearch}>
                    Search
                </button>
            </div>

            {error && <p>{error}</p>}
            {nutrition && (
                <>
                    <div>
                        <h3>{nutrition.food}</h3>
                        <div>
                            <div>
                                <span>Weight</span>
                                <span>{nutrition.weight}g</span>
                            </div>
                            <div>
                                <span>Calories</span>
                                <span>{nutrition.nutrients.calories}kcal</span>
                            </div>
                            <div>
                                <span>Carbs</span>
                                <span>{nutrition.nutrients.carbohydrates}g</span>
                            </div>
                            <div>
                                <span>Protein</span>
                                <span>{nutrition.nutrients.protein}g</span>
                            </div>
                            <div>
                                <span>Fats</span>
                                <span>{nutrition.nutrients.fats}g</span>
                            </div>
                        </div>
                    </div>
                    <NutritionTotals nutritionData={nutrition} />
                </>
            )}
        </div>
    );
};

export default NutritionSearch;
