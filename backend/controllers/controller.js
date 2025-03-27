import dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
});

console.log(process.env.API_KEY);

const renderHome = (req, res) => {
    res.render('home');
}

const fetchData = async (req, res) => {
    try {
        const foodName = req.query.food;
        if(!foodName){
            return res.status(400).json({error: "Food name is required"});
        }

        const API_KEY = "PBjPdzUs9NdT1R8bL7KKI5geswFowLTEAK261N0a";

        const URI = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(foodName)}&api_key=${API_KEY}`;

        const config = {
            method: "GET",
            mode: "cors",
            // headers : {
            //     "X-API-KEY" : API_KEY
            // }
        }

        const response = await fetch(URI, config);

        if(!response.ok){
            throw new Error(`API Request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (!data.foods || data.foods.length === 0) {
            return res.status(404).json({ error: "No matching food found" });
        }
        // console.log("Matching foods: ", data)

        const foodItem = data.foods[0];

        const nutrients = {};
        foodItem.foodNutrients.forEach(nutrient => {
            if (nutrient.nutrientName.includes("Energy")) {
                nutrients.calories = nutrient.value + " " + nutrient.unitName;
            } else if (nutrient.nutrientName.includes("Carbohydrate")) {
                nutrients.carbohydrates = nutrient.value + " " + nutrient.unitName;
            } else if (nutrient.nutrientName.includes("Protein")) {
                nutrients.protein = nutrient.value + " " + nutrient.unitName;
            } else if (nutrient.nutrientName.includes("Total lipid") || nutrient.nutrientName.includes("Fat")) {
                nutrients.fats = nutrient.value + " " + nutrient.unitName;
            }
        });


        res.json({food : foodItem.description,
            nutrients : nutrients
        });

        
    } catch(error){
        console.error("Error: " , error);
        res.json({error : "Failed to fetch food data"});
    }
}





export default {
    renderHome,
    fetchData
}