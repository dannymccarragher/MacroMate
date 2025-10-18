import Header from './components/Header.jsx'
import './App.css'
import NutritionDashboard from './components/NutritionDashboard.jsx';

function App() {
    return (
        <>
            <Header />
            <main className="app-main">
                <div className="container">
                    <div className="app-hero">
                        <h2>Track Your Nutrition Journey</h2>
                        <p>Monitor your daily macronutrient intake and log your meals with ease.</p>
                    </div>
                    <NutritionDashboard />
                </div>
            </main>
        </>
    );
}

export default App;
