import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./App.css";

// --- Reusable Components ---

const Loader = () => <div className="loader"></div>;

// SVG Icon for the download button for better visual communication
const DownloadIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="currentColor"
		viewBox="0 0 16 16">
		<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
		<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
	</svg>
);

// A dedicated component to display the scraped results in a card
const ScrapedResult = ({ title, content, onDownload }) => (
	<div className="scraped-result-card">
		<div className="result-header">
			<h2 className="result-title">{title}</h2>
			<button className="download-button" onClick={onDownload}>
				<DownloadIcon />
				Download .md
			</button>
		</div>
		<article className="scraped-content">
			<ReactMarkdown>{content}</ReactMarkdown>
		</article>
	</div>
);

// Main App Component
function App() {
	const [url, setUrl] = useState("");
	const [scrapedData, setScrapedData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const isValidUrl = (urlString) => {
		try {
			new URL(urlString);
			return urlString.startsWith("http");
		} catch (error) {
			console.log({ error });
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
				import.meta.env.VITE_APP_API + "/scrape",
				{
					url,
				}
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

	return (
		<div className="App">
			<div className="scraper-container">
				<header className="app-header">
					<h1>Story Scraper</h1>
					<p className="subtitle">
						Paste the URL of the first part of a story to save the entire series
						as a single file.
					</p>
				</header>

				<div className="input-container">
					<input
						type="url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						placeholder="https://example.com/story/part-1"
						disabled={loading}
						aria-label="URL to scrape"
					/>
					<button
						onClick={handleScrape}
						disabled={loading}
						className="scrape-button">
						{loading ? "Scraping..." : "Scrape"}
					</button>
				</div>

				<main className="output-container">
					{loading && <Loader />}
					{error && <div className="error-box">{error}</div>}
					{scrapedData && (
						<ScrapedResult
							title={scrapedData.title}
							content={scrapedData.content}
							onDownload={handleDownload}
						/>
					)}
				</main>
			</div>
			<footer className="app-footer">
				<p>Designed for educational purposes.</p>
			</footer>
		</div>
	);
}

export default App;
