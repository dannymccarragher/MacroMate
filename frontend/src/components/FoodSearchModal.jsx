import { useState, useEffect } from "react";
import { Plus, X, Search } from "lucide-react";
import FoodDetails from "./FoodDetails";

const FoodSearchModal = ({ isOpen, onClose, onAddFood }) => {
    const [food, setFood] = useState("");
    const [nutrition, setNutrition] = useState(null);
    const [error, setError] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selected, setSelected] = useState(false);

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
            const url = `http://localhost:3000/search?food=${selectedFood}&weight=100`;
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
        setError("");
    };

    const handleAddFoodToDiary = (foodData) => {
        onAddFood(foodData);
        handleBack();
    };

    const handleClose = () => {
        handleBack();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Add Food to Diary</h3>
                    <button className="modal-close" onClick={handleClose}>
                        <X />
                    </button>
                </div>

                <div className="modal-body">
                    {selected && nutrition ? (
                        <FoodDetails
                            nutrition={nutrition}
                            onBack={handleBack}
                            onAdd={handleAddFoodToDiary}
                        />
                    ) : (
                        <div className="modal-search-container">
                            {/* Search Section */}
                            <div className="form-group">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="form-input modal-search-input"
                                        placeholder="Search all foods & recipes..."
                                        value={food}
                                        onChange={(e) => setFood(e.target.value)}
                                        autoFocus
                                    />
                                    <div className="search-icon"><Search /></div>
                                </div>
                            </div>

                            {/* Suggestions Dropdown */}
                            {suggestions.length > 0 && (
                                <div className="modal-suggestions">
                                    {suggestions.map((item, index) => (
                                        <div
                                            key={index}
                                            className="modal-suggestion-item"
                                            onClick={() => handleSuggestionClick(item)}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Search Button - only show when food is entered */}
                            {food && (
                                <button
                                    className="btn btn-primary btn-lg w-full"
                                    onClick={() => handleSearch()}
                                >
                                    <Plus /> Search Food
                                </button>
                            )}

                            {error && <div className="error-message">{error}</div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodSearchModal;
