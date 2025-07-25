// src/components/Scraper.jsx
import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";

import useStoryLibrary from "../hooks/useStoryLibrary";
import Loader from "./common/Loader";

// --- Reusable Components (Icons) ---
// Import your existing icons: DownloadIcon, etc.
import DownloadIcon from "./common/icons/DownloadIcon"; // Adjust path if needed

// Enhanced Scraped Result Component (modified for saving)
const ScrapedResultWithSave = ({
	title,
	content,
	onDownload,
	onSaveToLibrary,
	saveLoading,
	saveError,
}) => {
	// Move state and controls logic here or pass as props if preferred
	// For simplicity, keeping it inline for now, but consider extracting if complex
	const [fontSize, setFontSize] = useState("medium");
	const [readingMode, setReadingMode] = useState(false);
	const [controlsExpanded, setControlsExpanded] = useState(false);
	const [estimatedReadTime, setEstimatedReadTime] = useState(0);
	const [wordCount, setWordCount] = useState(0);

	React.useEffect(() => {
		if (content) {
			const words = content.split(/\s+/).filter(Boolean).length;
			setWordCount(words);
			const readTime = Math.ceil(words / 200);
			setEstimatedReadTime(readTime);
		}
	}, [content]);

	return (
		<div className={`scraped-result-card ${readingMode ? "reading-mode" : ""}`}>
			<div className="result-header">
				<div className="title-section">
					<h2 className="result-title">{title}</h2>
					<div className="content-meta">
						<span className="read-time">~{estimatedReadTime} min read</span>
						<span className="word-count">{wordCount} words</span>
					</div>
				</div>
				<div className="header-actions">
					<button className="download-button" onClick={onDownload}>
						<DownloadIcon />
						<span className="btn-text">Download</span>
					</button>
					<button
						className="download-button"
						onClick={onSaveToLibrary}
						disabled={saveLoading} // Disable while saving
					>
						{/* Simple Save Icon */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							fill="currentColor"
							viewBox="0 0 16 16">
							<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z" />
							<path d="M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z" />
						</svg>
						<span className="btn-text">
							{saveLoading ? "Saving..." : "Save"}
						</span>
					</button>
				</div>
				{saveError && <div className="error-box">{saveError}</div>}
			</div>

			{/* --- Reading Controls --- */}
			{/* Include your ReadingControls component here */}
			{/* You'll need to manage its state (fontSize, readingMode, etc.) within this component or pass down */}
			{/* Example placeholder - you need to implement the full ReadingControls logic here or lift state up */}
			<div className="reading-controls">
				<div
					className="controls-header"
					onClick={() => setControlsExpanded(!controlsExpanded)}>
					<span className="controls-title">Reading Settings</span>
					<svg // Simple Collapse Icon Logic
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						fill="currentColor"
						viewBox="0 0 16 16"
						style={{
							transform: controlsExpanded ? "rotate(180deg)" : "rotate(0deg)",
							transition: "transform 0.3s ease",
						}}>
						<path
							fillRule="evenodd"
							d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
						/>
					</svg>
				</div>
				{controlsExpanded && (
					<div className="controls-content">
						<div className="font-size-control">
							<label>Text Size</label>
							<div className="font-size-buttons">
								<button
									className={`size-btn ${fontSize === "small" ? "active" : ""}`}
									onClick={() => setFontSize("small")}>
									A
								</button>
								<button
									className={`size-btn ${
										fontSize === "medium" ? "active" : ""
									}`}
									onClick={() => setFontSize("medium")}>
									A
								</button>
								<button
									className={`size-btn large ${
										fontSize === "large" ? "active" : ""
									}`}
									onClick={() => setFontSize("large")}>
									A
								</button>
							</div>
						</div>
						<div className="reading-mode-control">
							<button
								className={`mode-btn ${readingMode ? "active" : ""}`}
								onClick={() => setReadingMode(!readingMode)}>
								{/* ReadingModeIcon SVG here if you have it */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									fill="currentColor"
									viewBox="0 0 16 16">
									<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
									<path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H3zm0 1h10v14H3V1z" />
								</svg>
								Focus Mode
							</button>
						</div>
					</div>
				)}
			</div>
			{/* --- End Reading Controls --- */}

			<article className={`scraped-content ${fontSize}`}>
				<div className="content-wrapper">
					<ReactMarkdown
						components={{
							h1: ({ node, ...props }) => (
								<h1 className="content-h1" {...props} />
							),
							h2: ({ node, ...props }) => (
								<h2 className="content-h2" {...props} />
							),
							h3: ({ node, ...props }) => (
								<h3 className="content-h3" {...props} />
							),
							p: ({ node, ...props }) => (
								<p className="content-paragraph" {...props} />
							),
							ul: ({ node, ...props }) => (
								<ul className="content-list" {...props} />
							),
							ol: ({ node, ...props }) => (
								<ol className="content-list ordered" {...props} />
							),
							li: ({ node, ...props }) => (
								<li className="content-list-item" {...props} />
							),
							blockquote: ({ node, ...props }) => (
								<blockquote className="content-quote" {...props} />
							),
							code: ({ node, inline, ...props }) =>
								inline ? (
									<code className="content-inline-code" {...props} />
								) : (
									<code className="content-code-block" {...props} />
								),
						}}>
						{content}
					</ReactMarkdown>
				</div>
			</article>
		</div>
	);
};

// --- Main Scraper Component ---
const Scraper = () => {
	const [url, setUrl] = useState("");
	const [scrapedData, setScrapedData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const {
		saveStory,
		loading: saveLoading,
		error: saveError,
	} = useStoryLibrary(); // Use the library hook for saving

	const isValidUrl = (urlString) => {
		try {
			new URL(urlString);
			return urlString.startsWith("http");
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const handleScrape = async () => {
		if (!isValidUrl(url)) {
			setError("Please enter a valid URL beginning with http or https.");
			return;
		}
		setLoading(true);
		setError("");
		setScrapedData(null);
		try {
			const response = await axios.post(
				import.meta.env.VITE_APP_API + "/scrape", // Ensure VITE_APP_API is set
				{ url }
			);
			setScrapedData(response.data);
		} catch (err) {
			const errorMessage =
				err.response?.data?.error || "An unexpected error occurred.";
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const handleDownload = () => {
		if (!scrapedData) return;

		const markdownFileContent = `# ${scrapedData.title}\n\n${scrapedData.content}`;
		const blob = new Blob([markdownFileContent], { type: "text/markdown" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		const fileName = `${
			scrapedData.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() ||
			"scraped_story"
		}.md`;
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleSaveToLibrary = async () => {
		if (!scrapedData) return;

		const storyToSave = {
			id: uuidv4(), // Generate unique ID
			title: scrapedData.title,
			content: scrapedData.content,
			savedAt: new Date().toISOString(),
			// Recalculate/store if needed for library view consistency
			// wordCount and readTime are calculated in StoryViewer/ScrapedResult
		};

		try {
			await saveStory(storyToSave); // Use the hook's save function
			alert("Story saved to your library!");
		} catch (err) {
			// Error is handled by the hook and displayed in the component
			console.error("Save failed in component:", err);
			// alert('Failed to save story.'); // Optional: Additional UI feedback
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !loading) {
			handleScrape();
		}
	};

	return (
		<div className="scraper-container">
			<header className="app-header">
				<h1>Story Scraper</h1>
				<p className="subtitle">
					Paste the URL of the first part of a story to save the entire series
					as a single file optimized for mobile reading.
				</p>
			</header>

			<div className="input-container">
				<div className="input-wrapper">
					<input
						type="url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder="https://example.com/story/part-1  "
						disabled={loading}
						aria-label="URL to scrape"
						className="url-input"
					/>
					{url && (
						<button
							className="clear-btn"
							onClick={() => setUrl("")}
							aria-label="Clear URL">
							×
						</button>
					)}
				</div>
				<button
					onClick={handleScrape}
					disabled={loading || !url.trim()}
					className="scrape-button">
					{loading ? (
						<>
							<div className="btn-spinner"></div>
							Scraping...
						</>
					) : (
						"Scrape Story"
					)}
				</button>
			</div>

			<main className="output-container">
				{loading && <Loader />}
				{error && (
					<div className="error-box">
						<strong>Error:</strong> {error}
					</div>
				)}
				{scrapedData && (
					<ScrapedResultWithSave
						title={scrapedData.title}
						content={scrapedData.content}
						onDownload={handleDownload}
						onSaveToLibrary={handleSaveToLibrary}
						saveLoading={saveLoading} // Pass save loading state
						saveError={saveError} // Pass save error state
					/>
				)}
			</main>
		</div>
	);
};

export default Scraper;
