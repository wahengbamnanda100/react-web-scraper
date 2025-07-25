// import { useState } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import "./App.css";

// // --- Reusable Components --
// //
// // --- Enhanced Reusable Components ---
// const Loader = () => (
// 	<div className="loader-container">
// 		<div className="loader"></div>
// 		<p className="loader-text">Scraping content...</p>
// 	</div>
// );

// // Enhanced SVG Icons
// const DownloadIcon = () => (
// 	<svg
// 		xmlns="http://www.w3.org/2000/svg"
// 		width="18"
// 		height="18"
// 		fill="currentColor"
// 		viewBox="0 0 16 16">
// 		<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
// 		<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
// 	</svg>
// );

// const ReadingModeIcon = () => (
// 	<svg
// 		xmlns="http://www.w3.org/2000/svg"
// 		width="18"
// 		height="18"
// 		fill="currentColor"
// 		viewBox="0 0 16 16">
// 		<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
// 		<path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H3zm0 1h10v14H3V1z" />
// 	</svg>
// );

// const CollapseIcon = ({ isExpanded }) => (
// 	<svg
// 		xmlns="http://www.w3.org/2000/svg"
// 		width="18"
// 		height="18"
// 		fill="currentColor"
// 		viewBox="0 0 16 16"
// 		style={{
// 			transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
// 			transition: "transform 0.3s ease",
// 		}}>
// 		<path
// 			fillRule="evenodd"
// 			d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
// 		/>
// 	</svg>
// );

// // Enhanced Reading Controls Component
// const ReadingControls = ({
// 	fontSize,
// 	onFontSizeChange,
// 	readingMode,
// 	onReadingModeToggle,
// 	isExpanded,
// 	onToggleExpanded,
// }) => (
// 	<div className="reading-controls">
// 		<div className="controls-header" onClick={onToggleExpanded}>
// 			<span className="controls-title">Reading Settings</span>
// 			<CollapseIcon isExpanded={isExpanded} />
// 		</div>
// 		{isExpanded && (
// 			<div className="controls-content">
// 				<div className="font-size-control">
// 					<label>Text Size</label>
// 					<div className="font-size-buttons">
// 						<button
// 							className={`size-btn ${fontSize === "small" ? "active" : ""}`}
// 							onClick={() => onFontSizeChange("small")}>
// 							A
// 						</button>
// 						<button
// 							className={`size-btn ${fontSize === "medium" ? "active" : ""}`}
// 							onClick={() => onFontSizeChange("medium")}>
// 							A
// 						</button>
// 						<button
// 							className={`size-btn large ${
// 								fontSize === "large" ? "active" : ""
// 							}`}
// 							onClick={() => onFontSizeChange("large")}>
// 							A
// 						</button>
// 					</div>
// 				</div>
// 				<div className="reading-mode-control">
// 					<button
// 						className={`mode-btn ${readingMode ? "active" : ""}`}
// 						onClick={onReadingModeToggle}>
// 						<ReadingModeIcon />
// 						Focus Mode
// 					</button>
// 				</div>
// 			</div>
// 		)}
// 	</div>
// );

// // / Enhanced Scraped Result Component with reading optimizations
// const ScrapedResult = ({ title, content, onDownload }) => {
// 	const [fontSize, setFontSize] = useState("medium");
// 	const [readingMode, setReadingMode] = useState(false);
// 	const [controlsExpanded, setControlsExpanded] = useState(false);
// 	const [estimatedReadTime, setEstimatedReadTime] = useState(0);

// 	// Calculate estimated reading time (average 200 words per minute)
// 	useState(() => {
// 		const wordCount = content.split(/\s+/).length;
// 		const readTime = Math.ceil(wordCount / 200);
// 		setEstimatedReadTime(readTime);
// 	}, [content]);

// 	return (
// 		<div className={`scraped-result-card ${readingMode ? "reading-mode" : ""}`}>
// 			<div className="result-header">
// 				<div className="title-section">
// 					<h2 className="result-title">{title}</h2>
// 					<div className="content-meta">
// 						<span className="read-time">~{estimatedReadTime} min read</span>
// 						<span className="word-count">
// 							{content.split(/\s+/).length} words
// 						</span>
// 					</div>
// 				</div>
// 				<div className="header-actions">
// 					<button className="download-button" onClick={onDownload}>
// 						<DownloadIcon />
// 						<span className="btn-text">Download</span>
// 					</button>
// 				</div>
// 			</div>

// 			<ReadingControls
// 				fontSize={fontSize}
// 				onFontSizeChange={setFontSize}
// 				readingMode={readingMode}
// 				onReadingModeToggle={() => setReadingMode(!readingMode)}
// 				isExpanded={controlsExpanded}
// 				onToggleExpanded={() => setControlsExpanded(!controlsExpanded)}
// 			/>

// 			<article className={`scraped-content ${fontSize}`}>
// 				<div className="content-wrapper">
// 					<ReactMarkdown
// 						components={{
// 							h1: ({ node, ...props }) => (
// 								<h1 className="content-h1" {...props} />
// 							),
// 							h2: ({ node, ...props }) => (
// 								<h2 className="content-h2" {...props} />
// 							),
// 							h3: ({ node, ...props }) => (
// 								<h3 className="content-h3" {...props} />
// 							),
// 							p: ({ node, ...props }) => (
// 								<p className="content-paragraph" {...props} />
// 							),
// 							ul: ({ node, ...props }) => (
// 								<ul className="content-list" {...props} />
// 							),
// 							ol: ({ node, ...props }) => (
// 								<ol className="content-list ordered" {...props} />
// 							),
// 							li: ({ node, ...props }) => (
// 								<li className="content-list-item" {...props} />
// 							),
// 							blockquote: ({ node, ...props }) => (
// 								<blockquote className="content-quote" {...props} />
// 							),
// 							code: ({ node, inline, ...props }) =>
// 								inline ? (
// 									<code className="content-inline-code" {...props} />
// 								) : (
// 									<code className="content-code-block" {...props} />
// 								),
// 						}}>
// 						{content}
// 					</ReactMarkdown>
// 				</div>
// 			</article>
// 		</div>
// 	);
// };

// // Main App Component with enhanced mobile UX
// function App() {
// 	const [url, setUrl] = useState("");
// 	const [scrapedData, setScrapedData] = useState(null);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState("");

// 	const isValidUrl = (urlString) => {
// 		try {
// 			new URL(urlString);
// 			return urlString.startsWith("http");
// 		} catch (error) {
// 			console.log(error);
// 			return false;
// 		}
// 	};

// 	const handleScrape = async () => {
// 		if (!isValidUrl(url)) {
// 			setError("Please enter a valid URL beginning with http or https.");
// 			return;
// 		}
// 		setLoading(true);
// 		setError("");
// 		setScrapedData(null);
// 		try {
// 			const response = await axios.post(
// 				import.meta.env.VITE_APP_API + "/scrape",
// 				{
// 					url,
// 				}
// 			);
// 			setScrapedData(response.data);
// 		} catch (err) {
// 			const errorMessage =
// 				err.response?.data?.error || "An unexpected error occurred.";
// 			setError(errorMessage);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const handleDownload = () => {
// 		if (!scrapedData) return;

// 		const markdownFileContent = `# ${scrapedData.title}\n\n${scrapedData.content}`;
// 		const blob = new Blob([markdownFileContent], { type: "text/markdown" });
// 		const link = document.createElement("a");
// 		link.href = URL.createObjectURL(blob);
// 		const fileName = `${
// 			scrapedData.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() ||
// 			"scraped_story"
// 		}.md`;
// 		link.download = fileName;
// 		document.body.appendChild(link);
// 		link.click();
// 		document.body.removeChild(link);
// 	};

// 	const handleKeyPress = (e) => {
// 		if (e.key === "Enter" && !loading) {
// 			handleScrape();
// 		}
// 	};

// 	return (
// 		<div className="App">
// 			<div className="scraper-container">
// 				<header className="app-header">
// 					<h1>Story Scraper</h1>
// 					<p className="subtitle">
// 						Paste the URL of the first part of a story to save the entire series
// 						as a single file optimized for mobile reading.
// 					</p>
// 				</header>

// 				<div className="input-container">
// 					<div className="input-wrapper">
// 						<input
// 							type="url"
// 							value={url}
// 							onChange={(e) => setUrl(e.target.value)}
// 							onKeyPress={handleKeyPress}
// 							placeholder="https://example.com/story/part-1"
// 							disabled={loading}
// 							aria-label="URL to scrape"
// 							className="url-input"
// 						/>
// 						{url && (
// 							<button
// 								className="clear-btn"
// 								onClick={() => setUrl("")}
// 								aria-label="Clear URL">
// 								×
// 							</button>
// 						)}
// 					</div>
// 					<button
// 						onClick={handleScrape}
// 						disabled={loading || !url.trim()}
// 						className="scrape-button">
// 						{loading ? (
// 							<>
// 								<div className="btn-spinner"></div>
// 								Scraping...
// 							</>
// 						) : (
// 							"Scrape Story"
// 						)}
// 					</button>
// 				</div>

// 				<main className="output-container">
// 					{loading && <Loader />}
// 					{error && (
// 						<div className="error-box">
// 							<strong>Error:</strong> {error}
// 						</div>
// 					)}
// 					{scrapedData && (
// 						<ScrapedResult
// 							title={scrapedData.title}
// 							content={scrapedData.content}
// 							onDownload={handleDownload}
// 						/>
// 					)}
// 				</main>
// 			</div>

// 			<footer className="app-footer">
// 				<p>Designed for continuous reading experience @Nandakumar.</p>
// 			</footer>
// 		</div>
// 	);
// }

// export default App;

// src/components/App.jsx
import React, { useState } from "react";
import Scraper from "./components/Scraper";
import Library from "./components/Library";
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
