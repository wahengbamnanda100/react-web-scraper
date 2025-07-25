// src/components/App.jsx
import React, { useState } from "react";
import Scraper from "./Scraper";
import Library from "./Library";
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // If using routing

const App = () => {
	const [currentView, setCurrentView] = useState("scraper"); // 'scraper' or 'library'

	// Simple view switching without router
	const renderCurrentView = () => {
		switch (currentView) {
			case "library":
				return <Library />;
			case "scraper":
			default:
				return <Scraper />;
		}
	};

	return (
		<div className="App">
			{/* Simple Navigation */}
			<nav style={{ marginBottom: "1rem", textAlign: "center" }}>
				<button
					onClick={() => setCurrentView("scraper")}
					style={{
						margin: "0 0.5rem",
						padding: "0.5rem 1rem",
						background: currentView === "scraper" ? "#6366f1" : "#333",
						color: "white",
						border: "none",
						borderRadius: "4px",
					}}>
					Scraper
				</button>
				<button
					onClick={() => setCurrentView("library")}
					style={{
						margin: "0 0.5rem",
						padding: "0.5rem 1rem",
						background: currentView === "library" ? "#6366f1" : "#333",
						color: "white",
						border: "none",
						borderRadius: "4px",
					}}>
					Library
				</button>
			</nav>

			{renderCurrentView()}

			<footer className="app-footer">
				<p>Designed for continuous reading experience @Nandakumar.</p>
			</footer>
		</div>
	);
};

export default App;

// --- If using React Router ---
/*
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <Link to="/" style={{ margin: '0 0.5rem', padding: '0.5rem 1rem', background: '#333', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Scraper</Link>
          <Link to="/library" style={{ margin: '0 0.5rem', padding: '0.5rem 1rem', background: '#333', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Library</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Scraper />} />
          <Route path="/library" element={<Library />} />
        </Routes>

        <footer className="app-footer">
          <p>Designed for continuous reading experience @Nandakumar.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
*/
