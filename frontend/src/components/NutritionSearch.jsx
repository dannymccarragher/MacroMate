import { useState, useEffect } from "react";
import NutritionTotals from "./NutritionTotals";
import FoodDetails from "./FoodDetails";
import NutritionLog from "./NutritionLog";

const NutritionSearch = () => {
    const [food, setFood] = useState("");
    const [weight, setWeight] = useState(100);
    const [nutrition, setNutrition] = useState(null);
    const [error, setError] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selected, setSelected] = useState(false);
    const [diary, setDiary] = useState([]); 

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

    const handleDelete = (indexToDelete) => {
        if (indexToDelete >= 0 && indexToDelete < diary.length) {
            const updatedDiary = diary.filter((_, i) => i !== indexToDelete);
            setDiary(updatedDiary);
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
        setDiary(prev => [...prev, foodData]); 
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
        <div className="grid gap-6">
            {/* Search Section */}
            <div className="card">
                <div className="card-header">
                    <h3>Search for Food</h3>
                    <p className="text-secondary">Find nutritional information for any food item</p>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label className="form-label">Food Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter food name (e.g., apple, chicken breast)"
                                value={food}
                                onChange={(e) => setFood(e.target.value)}
                            />
                            {suggestions.length > 0 && (
                                <ul className="suggestions-list">
                                    {suggestions.map((item, index) => (
                                        <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(item)}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Weight (grams)</label>
                        <input
                            type="number"
                            className="form-input"
                            placeholder="100"
                            value={weight}
                            onChange={(e) => setWeight(parseFloat(e.target.value) || 100)}
                        />
                    </div>

                    <button className="btn btn-primary btn-lg" onClick={() => handleSearch()}>
                        🔍 Search Food
                    </button>

                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>

            {/* Daily Totals and Log */}
            {diary.length > 0 && (
                <div className="grid gap-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>Today's Nutrition Summary</h3>
                            <p className="text-secondary">Your daily macronutrient totals</p>
                        </div>
                        <div className="card-body">
                            <NutritionTotals nutritionData={calculateTotals()} />
                        </div>
                    </div>
                    
                    <div className="card">
                        <div className="card-header">
                            <h3>Food Log</h3>
                            <p className="text-secondary">Track your meals and snacks</p>
                        </div>
                        <div className="card-body">
                            <NutritionLog entries={diary} onDelete={handleDelete}/>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {diary.length === 0 && !selected && (
                <div className="card">
                    <div className="empty-state">
                        <div className="empty-state-icon">🍽️</div>
                        <h3 className="empty-state-title">Start Your Nutrition Journey</h3>
                        <p className="empty-state-description">
                            Search for foods above to begin tracking your daily nutrition intake.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NutritionSearch;
