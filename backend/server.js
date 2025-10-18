import express from 'express';
import router from './router/router.js';
import cors from 'cors';
import sequelize from './db/db.js';
import './models/FoodEntry.js';
import './models/User.js';
import './models/DailyTotal.js';

const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set('views', "frontend/views")
app.use(express.static("public"));

// Authenticate and sync database
try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync all models with database
    await sequelize.sync({ alter: true });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));