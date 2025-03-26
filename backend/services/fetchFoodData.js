import dotenv from 'dotenv';

dotenv.config({
    path: '../backend/.env'
});

// console.log(process.API_KEY);

const fetchData = async(foodName) => {
    try {
        const API_KEY = process.env.API_KEY;
        const URI = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(foodName)}&api_key=${API_KEY}`;
        
        const config = {
            method: "GET",
            mode: "cors"
        }

        const response = await fetch(URI, config);

        const data = await response.json();
        console.log("Matching foods: ", data)
    } catch(error){
        console.error("Error: " , error);
    }
}

export default fetchData;