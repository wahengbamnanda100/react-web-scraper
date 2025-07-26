// src/components/Library.jsx
import React, { useState } from "react";
import useStoryLibrary from "../hooks/useStoryLibrary";
import Loader from "./common/Loader";
import StoryViewer from "./StoryViewer";

// --- Helper Function to Format Date ---
const formatDate = (dateString) => {
	if (!dateString) return "Never";
	const date = new Date(dateString);

	// Check if it was today
	const today = new Date();
	if (date.toDateString() === today.toDateString()) {
		return `Today at ${date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		})}`;
	}

	// Check if it was yesterday
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	if (date.toDateString() === yesterday.toDateString()) {
		return `Yesterday at ${date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		})}`;
	}

	// For older dates, show date and time
	return date.toLocaleString([], {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};
// --- End Helper Function ---

const Library = () => {
	const { stories, loading, error, getStoryById, deleteStory } =
		useStoryLibrary();
	const [selectedStory, setSelectedStory] = useState(null);
	const [viewingStory, setViewingStory] = useState(null);
	const [deletingStoryId, setDeletingStoryId] = useState(null);

	const handleStorySelect = async (storyMeta) => {
		setSelectedStory(storyMeta.id); // Simplify to just the ID
		try {
			const fullStory = await getStoryById(storyMeta.id);
			if (fullStory) {
				setViewingStory(fullStory);
			} else {
				alert("Story could not be loaded.");
			}
		} catch (err) {
			alert("Error loading story.");
			console.error("Error loading story:", err);
		} finally {
			setSelectedStory(null);
		}
	};

	const handleBackToList = () => {
		setViewingStory(null);
	};

	const handleRemoveStory = async (storyId, storyTitle) => {
		const confirmed = window.confirm(
			`Are you sure you want to remove "${storyTitle}" from your library?`
		);
		if (!confirmed) return;

		setDeletingStoryId(storyId);
		try {
			await deleteStory(storyId);
			console.log(`Story ${storyId} removed.`);
		} catch (err) {
			console.error("Error removing story:", err);
			alert("Failed to remove story. Please try again.");
		} finally {
			setDeletingStoryId(null);
		}
	};

	if (viewingStory) {
		return <StoryViewer story={viewingStory} onBack={handleBackToList} />;
	}

	return (
		<div className="scraper-container">
			<header className="app-header">
				<h1>Your Library</h1>
				<p className="subtitle">Browse, read, and manage your saved stories.</p>
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
							<p>
								No stories saved yet. Scrape one and save it to your library!
							</p>
						) : (
							<div className="library-list">
								<h2>Saved Stories ({stories.length})</h2>
								<ul className="story-list">
									{stories
										// Optional: Sort stories by last opened, with never-opened ones at the end
										.sort((a, b) => {
											// Handle null/undefined lastOpened
											if (!a.lastOpened && !b.lastOpened) return 0;
											if (!a.lastOpened) return 1; // a goes after b
											if (!b.lastOpened) return -1; // b goes after a
											return new Date(b.lastOpened) - new Date(a.lastOpened); // Newest first
										})
										.map((story) => (
											<li
												key={story.id}
												className={`story-item ${
													selectedStory === story.id ? "loading" : ""
												} ${deletingStoryId === story.id ? "deleting" : ""}`}>
												<div
													onClick={() => handleStorySelect(story)}
													style={{ cursor: "pointer", flexGrow: 1 }}>
													<h3>{story.title}</h3>
													{/* Display stats directly from story object or calculate if missing */}
													<p>
														{story.wordCount !== undefined &&
														story.readTime !== undefined
															? `${story.wordCount} words (~${story.readTime} min)`
															: "Calculating..."}{" "}
														{/* Fallback while list loads if stats weren't pre-calculated */}
													</p>
													{/* Display Last Opened Time */}
													<small>
														Last opened: {formatDate(story.lastOpened)}
													</small>
													<br /> {/* Line break for Saved time */}
													<small>
														Saved:{" "}
														{story.savedAt
															? new Date(story.savedAt).toLocaleDateString([], {
																	year: "numeric",
																	month: "short",
																	day: "numeric",
															  })
															: "Unknown"}
													</small>
												</div>
												<button
													className="remove-button"
													onClick={(e) => {
														e.stopPropagation();
														handleRemoveStory(story.id, story.title);
													}}
													disabled={deletingStoryId === story.id}
													aria-label={`Remove ${story.title}`}>
													{deletingStoryId === story.id ? (
														<div
															className="btn-spinner"
															style={{
																width: "16px",
																height: "16px",
																margin: 0,
															}}></div>
													) : (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															viewBox="0 0 16 16">
															<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
															<path
																fillRule="evenodd"
																d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
															/>
														</svg>
													)}
												</button>
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
