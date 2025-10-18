import { ClipboardList, Trash2, Flame, Wheat, Drumstick, Droplet } from "lucide-react";

const NutritionLog = ({ entries, onDelete }) => {
    if (entries.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon"><ClipboardList size={32} /></div>
                <h4 className="empty-state-title">No foods logged yet</h4>
                <p className="empty-state-description">
                    Start adding foods to see them appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {entries.map((item, index) => (
                <div key={index} className="food-entry">
                    <div className="food-entry-header">
                        <h4 className="food-entry-title">{item.food}</h4>
                        <div className="food-entry-actions">
                            <span className="text-sm text-secondary">{item.weight}g</span>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => onDelete(index)}
                            >
                                <Trash2 /> Delete
                            </button>
                        </div>
                    </div>

                    <div className="food-entry-nutrition">
                        <div className="nutrition-metric">
                            <div className="nutrition-icon calories"><Flame /></div>
                            <div className="nutrition-value">
                                <div className="nutrition-label">Calories</div>
                                <div className="nutrition-amount">
                                    {Math.round(item.nutrients.calories)}
                                    <span className="nutrition-unit">kcal</span>
                                </div>
                            </div>
                        </div>

                        <div className="nutrition-metric">
                            <div className="nutrition-icon carbs"><Wheat /></div>
                            <div className="nutrition-value">
                                <div className="nutrition-label">Carbs</div>
                                <div className="nutrition-amount">
                                    {Math.round(item.nutrients.carbohydrates)}
                                    <span className="nutrition-unit">g</span>
                                </div>
                            </div>
                        </div>

                        <div className="nutrition-metric">
                            <div className="nutrition-icon protein"><Drumstick /></div>
                            <div className="nutrition-value">
                                <div className="nutrition-label">Protein</div>
                                <div className="nutrition-amount">
                                    {Math.round(item.nutrients.protein)}
                                    <span className="nutrition-unit">g</span>
                                </div>
                            </div>
                        </div>

                        <div className="nutrition-metric">
                            <div className="nutrition-icon fats"><Droplet /></div>
                            <div className="nutrition-value">
                                <div className="nutrition-label">Fats</div>
                                <div className="nutrition-amount">
                                    {Math.round(item.nutrients.fats)}
                                    <span className="nutrition-unit">g</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NutritionLog;
