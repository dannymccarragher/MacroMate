import { useState, useEffect } from "react";
import NutritionTotals from "./NutritionTotals";
import FoodDetails from "./FoodDetails";

const NutritionSearch = () => {
    const [food, setFood] = useState("");
    const [weight, setWeight] = useState(100);
    const [nutrition, setNutrition] = useState(null);
    const [error, setError] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selected, setSelected] = useState(false);
    const [diary, setDiary] = useState([]); // 🆕 Track added foods

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (food.length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/suggest?query=${food}`);
                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data);
                }
            } catch {
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [food]);

    const handleSearch = async (selectedFood = food) => {
        try {
            const url = `http://localhost:3000/search?food=${selectedFood}&weight=${weight}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("No data found or API error.");
            }

            const data = await response.json();
            setNutrition(data);
            setError("");
            setSuggestions([]);
            setSelected(true);
        } catch (err) {
            setError(err.message);
            setNutrition(null);
        }
    };

    const handleSuggestionClick = (suggestedFood) => {
        setFood(suggestedFood);
        handleSearch(suggestedFood);
    };

    const handleBack = () => {
        setSelected(false);
        setNutrition(null);
        setFood("");
        setSuggestions([]);
    };

    const handleAddFood = (foodData) => {
        setDiary(prev => [...prev, foodData]); // 🆕 Add to diary
        handleBack();
    };

    const calculateTotals = () => {
        return diary.reduce((totals, item) => {
            totals.calories += item.nutrients.calories || 0;
            totals.carbohydrates += item.nutrients.carbohydrates || 0;
            totals.protein += item.nutrients.protein || 0;
            totals.fats += item.nutrients.fats || 0;
            return totals;
        }, { calories: 0, carbohydrates: 0, protein: 0, fats: 0 });
    };

    if (selected && nutrition) {
        return (
            <FoodDetails
                nutrition={nutrition}
                onBack={handleBack}
                onAdd={handleAddFood}
            />
        );
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Enter food name"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                />
                <button onClick={() => handleSearch()}>Search</button>
            </div>

            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((item, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            {error && <p>{error}</p>}

            {diary.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Today's Totals</h3>
                    <NutritionTotals nutritionData={calculateTotals()} />
                </div>
            )}
        </div>
    );
};

export default NutritionSearch;
