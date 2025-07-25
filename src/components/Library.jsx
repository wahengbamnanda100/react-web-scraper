// src/components/Library.jsx
import { useState } from "react";

import useStoryLibrary from "../hooks/useStoryLibrary";
import Loader from "./common/Loader";
import StoryViewer from "./StoryViewer";

const Library = () => {
	const { stories, loading, error, getStoryById } = useStoryLibrary();
	const [selectedStory, setSelectedStory] = useState(null);
	const [viewingStory, setViewingStory] = useState(null); // State for the full story object to view

	const handleStorySelect = async (storyMeta) => {
		// storyMeta is the object from the list
		setSelectedStory(storyMeta); // Show loading state or indicator
		try {
			const fullStory = await getStoryById(storyMeta.id);
			if (fullStory) {
				setViewingStory(fullStory);
			} else {
				alert("Story could not be loaded.");
			}
		} catch (err) {
			alert("Error loading story.", err);
		} finally {
			setSelectedStory(null); // Hide loading indicator
		}
	};

	const handleBackToList = () => {
		setViewingStory(null);
	};

	if (viewingStory) {
		return <StoryViewer story={viewingStory} onBack={handleBackToList} />;
	}

	return (
		<div className="scraper-container">
			{" "}
			{/* Reuse container styling */}
			<header className="app-header">
				<h1>Your Library</h1>
				<p className="subtitle">Browse and read your saved stories.</p>
			</header>
			<main className="output-container">
				{loading && <Loader />}
				{error && (
					<div className="error-box">
						<strong>Error:</strong> {error}
					</div>
				)}
				{!loading && !error && (
					<>
						{stories.length === 0 ? (
							<p>No stories saved yet. Scrape one and save it!</p>
						) : (
							<div className="library-list">
								<h2>Saved Stories ({stories.length})</h2>
								<ul className="story-list">
									{" "}
									{/* Add styles in CSS if needed */}
									{stories.map((story) => (
										<li
											key={story.id}
											className={`story-item ${
												selectedStory?.id === story.id ? "loading" : ""
											}`} // Optional loading style
											onClick={() => handleStorySelect(story)}>
											<h3>{story.title}</h3>
											{/* Safely access properties that might be calculated in viewer */}
											{story.wordCount !== undefined &&
											story.readTime !== undefined ? (
												<p>
													{story.wordCount} words (~{story.readTime} min)
												</p>
											) : (
												<p>Details loading...</p>
											)}
											<small>
												Saved:{" "}
												{story.savedAt
													? new Date(story.savedAt).toLocaleString()
													: "Unknown"}
											</small>
										</li>
									))}
								</ul>
							</div>
						)}
					</>
				)}
			</main>
		</div>
	);
};

export default Library;
