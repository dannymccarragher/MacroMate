import Header from './components/Header.jsx'
import './App.css'
import NutritionSearch from './components/NutritionSearch.jsx';

function App() {
  return (
      <>
          <Header />
          <main className="app-main">
              <div className="container">
                  <div className="app-hero">
                      <h2>Track Your Nutrition Journey</h2>
                      <p>Search for foods, log your meals, and monitor your daily macronutrient intake with ease.</p>
                  </div>
                  <NutritionSearch />
              </div>
          </main>
      </>
  );
}

export default App;
