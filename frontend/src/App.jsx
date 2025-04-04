import { useState } from 'react'
import Header from './components/Header.jsx'
import './App.css'
import NutritionSearch from './components/NutritionSearch.jsx';

function App() {
  return (
      <>
          <Header />
          <main className="container mx-auto p-4">
              <h2>Welcome to MacroMate!</h2>
              <NutritionSearch />
          </main>
      </>
  );
}

export default App;
