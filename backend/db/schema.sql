-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create food_entries table
CREATE TABLE IF NOT EXISTS food_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    food_name VARCHAR(100) NOT NULL,
    weight_grams INT NOT NULL,
    calories DECIMAL(10,2) NOT NULL,
    carbohydrates DECIMAL(10,2) NOT NULL,
    protein DECIMAL(10,2) NOT NULL,
    fats DECIMAL(10,2) NOT NULL,
    entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create daily_totals table for caching daily nutrition totals
CREATE TABLE IF NOT EXISTS daily_totals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    date DATE NOT NULL,
    total_calories DECIMAL(10,2) NOT NULL,
    total_carbohydrates DECIMAL(10,2) NOT NULL,
    total_protein DECIMAL(10,2) NOT NULL,
    total_fats DECIMAL(10,2) NOT NULL,
    UNIQUE(user_id, date),
    FOREIGN KEY (user_id) REFERENCES users(id)
); 