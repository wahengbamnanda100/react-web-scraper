// src/components/App.jsx
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useEffect, useRef, useState, useMemo } from "react";
import Scraper from "./components/Scraper";
import Library from "./components/Library";

const App = () => {
	const location = useLocation();
	const nodeRef = useRef(null);
	const [activeRoute, setActiveRoute] = useState("scraper");
	const previousLocationRef = useRef(location.pathname); // Initialize with current pathname

	const routeOrder = ["/", "/library"];

	// Determine slide direction based on route navigation
	const getSlideDirection = (currentPath, previousPath) => {
		const currentIndex = routeOrder.indexOf(currentPath);
		const previousIndex = routeOrder.indexOf(previousPath);

		if (currentIndex > previousIndex) {
			return "slide-left-to-right"; // Forward
		} else {
			return "slide-right-to-left"; // Backward
		}
	};

	// Compute slide direction based on previous location BEFORE location updates
	const slideDirection = useMemo(() => {
		return getSlideDirection(location.pathname, previousLocationRef.current);
	}, [location.pathname]);

	useEffect(() => {
		// Update active route
		setActiveRoute(location.pathname === "/" ? "scraper" : "library");

		// After transition direction is calculated, update previous path
		previousLocationRef.current = location.pathname;
	}, [location.pathname]);

	return (
		<div className="App">
			{/* Mobile Navigation */}
			<div className="app-navigation" data-active={activeRoute}>
				<Link
					to="/"
					className={`nav-button ${location.pathname === "/" ? "active" : ""}`}
					aria-label="Navigate to Scraper">
					Scraper
				</Link>
				<Link
					to="/library"
					className={`nav-button ${
						location.pathname === "/library" ? "active" : ""
					}`}
					aria-label="Navigate to Library">
					Library
				</Link>
			</div>

			{/* Transition Container */}
			<div className="view-container">
				<SwitchTransition mode="out-in">
					<CSSTransition
						key={location.pathname}
						classNames={slideDirection}
						timeout={350}
						unmountOnExit
						nodeRef={nodeRef}>
						<div ref={nodeRef}>
							<Routes location={location}>
								<Route path="/" element={<Scraper />} />
								<Route path="/library" element={<Library />} />
							</Routes>
						</div>
					</CSSTransition>
				</SwitchTransition>
			</div>

			<footer className="app-footer">
				<p>Designed for continuous reading experience @Nandakumar.</p>
			</footer>
		</div>
	);
};

export default App;
