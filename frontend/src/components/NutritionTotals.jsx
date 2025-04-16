import { useState, useEffect } from 'react';

const NutritionTotals = ({ nutritionData }) => {
    const [totals, setTotals] = useState({
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fats: 0
    });

    useEffect(() => {
        if (nutritionData) {
            setTotals(prev => ({
                calories: prev.calories + nutritionData.nutrients.calories,
                carbohydrates: prev.carbohydrates + nutritionData.nutrients.carbohydrates,
                protein: prev.protein + nutritionData.nutrients.protein,
                fats: prev.fats + nutritionData.nutrients.fats
            }));
        }
    }, [nutritionData]);

    const resetTotals = () => {
        setTotals({
            calories: 0,
            carbohydrates: 0,
            protein: 0,
            fats: 0
        });
    };

    return (
        <div>
            <div>
                <h2>Nutrition Totals</h2>
                <button onClick={resetTotals}>Reset</button>
            </div>

            <div>
                <div>
                    <span>Total Calories</span>
                    <span>{totals.calories.toFixed(1)} kcal</span>
                </div>
                <div>
                    <span>Total Carbs</span>
                    <span>{totals.carbohydrates.toFixed(1)}g</span>
                </div>
                <div>
                    <span>Total Protein</span>
                    <span>{totals.protein.toFixed(1)}g</span>
                </div>
                <div>
                    <span>Total Fats</span>
                    <span>{totals.fats.toFixed(1)}g</span>
                </div>
            </div>
        </div>
    );
};

export default NutritionTotals;
