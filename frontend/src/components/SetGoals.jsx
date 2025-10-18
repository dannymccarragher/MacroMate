import { useState } from "react";
import { Target } from "lucide-react";

const SetGoals = ({ onSave, currentGoals = {} }) => {
    const [goals, setGoals] = useState({
        calories: currentGoals.calories || "",
        protein: currentGoals.protein || "",
        carbs: currentGoals.carbs || "",
        fat: currentGoals.fat || ""
    });

    const handleChange = (e) => {
        setGoals({ ...goals, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(goals); // Save the goals when the user submits
    };

    const fields = [
        { name: "calories", label: "Calories", unit: "kcal" },
        { name: "protein", label: "Protein", unit: "g" },
        { name: "carbs", label: "Carbs", unit: "g" },
        { name: "fat", label: "Fat", unit: "g" }
    ];

    return (
        <div className="goals-form">
            <div className="goals-header">
                <Target />
                <p className="text-secondary">Set your daily nutritional targets</p>
            </div>
            <div className="form-group-grid">
                {fields.map((field) => (
                    <div key={field.name} className="form-group">
                        <label className="form-label">
                            {field.label} ({field.unit})
                        </label>
                        <input
                            type="number"
                            name={field.name}
                            className="form-input"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            value={goals[field.name]}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>
                ))}
            </div>
            <button className="btn btn-primary w-full" onClick={handleSubmit}>
                <Target /> Save Goals
            </button>
        </div>
    );
};

export default SetGoals;
