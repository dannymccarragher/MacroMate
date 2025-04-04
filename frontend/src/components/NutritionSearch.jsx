import { useState } from "react";

const NutritionSearch = () => {

    const [food, setFood] = useState("");
    const [weight, setWeight] = useState(100);
    const [nutrition, setNutrition] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3000/search/food?food=${food}&weight=${weight}`);

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
            <input 
                type="text" 
                placeholder="Enter food name" 
                value={food} 
                onChange={(e) => setFood(e.target.value)} 
            />
            <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {nutrition && (
                <div>
                    <h3>{nutrition.food}</h3>
                    <p>Weight: {nutrition.weight}</p>
                    <p>Calories: {nutrition.nutrients.calories}</p>
                    <p>Carbs: {nutrition.nutrients.carbohydrates}</p>
                    <p>Protein: {nutrition.nutrients.protein}</p>
                    <p>Fats: {nutrition.nutrients.fats}</p>
                </div>
            )}
        </div>
    );
};

export default NutritionSearch;
