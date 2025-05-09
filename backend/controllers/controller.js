import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const API_KEY = process.env.API_KEY || "PBjPdzUs9NdT1R8bL7KKI5geswFowLTEAK261N0a";

const fetchData = async (req, res) => {
    try {
        const foodName = req.query.food;
        if (!foodName) {
            return res.status(400).json({ error: "Food name is required" });
        }


        const weight = parseFloat(req.query.weight) || 100;

        const URI = `http://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(foodName)}&api_key=${API_KEY}`;

        const response = await fetch(URI);

        if (!response.ok) {
            throw new Error(`API Request failed with status ${response.status}`);
        }

        const data = await response.json();


        if (!data.foods || data.foods.length === 0) {
            return res.status(404).json({ error: "No matching food found" });
        }

        const foodItem = data.foods[0];

        const nutrients = {};

        const servingSize = foodItem.servingSize;
        // Extract nutrients data and scale based on weight
        foodItem.foodNutrients.forEach(nutrient => {
            let nutrientValue = nutrient.value;

            if (nutrientValue) {
                nutrientValue = (nutrientValue * weight) / 100;
            }

            if (nutrient.nutrientName.includes("Energy")) {
                nutrients.calories = nutrientValue;
            } else if (nutrient.nutrientName.includes("Carbohydrate")) {
                nutrients.carbohydrates = nutrientValue;
            } else if (nutrient.nutrientName.includes("Protein")) {
                nutrients.protein = nutrientValue;
            } else if (nutrient.nutrientName.includes("Total lipid") || nutrient.nutrientName.includes("Fat")) {
                nutrients.fats = nutrientValue;
            }
        });

            res.json({
                food: foodItem.description,
                weight: weight,
                nutrients: nutrients,
                servingSize
            });

    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Failed to fetch food data" });
    }
};

const suggestFoods = async (req, res) => {
    try {
        const query = req.query.query;

        if (!query || query.length < 2) {
            return res.status(400).json({ error: "Query must be at least 2 characters long" });
        }

        const URI = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&api_key=${API_KEY}&pageSize=10`;

        const response = await fetch(URI);

        if (!response.ok) {
            throw new Error(`USDA API error with status ${response.status}`);
        }

        const data = await response.json();

        if (!data.foods || data.foods.length === 0) {
            return res.json([]); // Return empty array if no suggestions found
        }

        const suggestions = data.foods.map(food => food.description);
        res.json(suggestions);

    } catch (error) {
        console.error("Suggestion Error:", error);
        res.status(500).json({ error: "Failed to fetch food suggestions" });
    }
};

export default {
    fetchData,
    suggestFoods
};