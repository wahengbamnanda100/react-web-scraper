// src/hooks/useStoryLibrary.js
import { useState, useEffect } from "react";
import { storyStorageService } from "../services/storyStorageService";

const useStoryLibrary = () => {
	const [stories, setStories] = useState([]); // List of story metadata
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch all stories on mount or when needed
	const fetchStories = async () => {
		setLoading(true);
		setError(null);
		try {
			const fetchedStories = await storyStorageService.getAllStories();
			setStories(fetchedStories);
		} catch (err) {
			console.error("Error fetching stories:", err);
			setError("Failed to load stories.");
		} finally {
			setLoading(false);
		}
	};

	// Save a new story
	const saveStory = async (storyData) => {
		// storyData must have an 'id'
		setLoading(true);
		setError(null);
		try {
			await storyStorageService.saveStory(storyData);
			// Optimistically update the local state
			setStories((prevStories) => [...prevStories, storyData]);
			return storyData; // Return saved story data
		} catch (err) {
			console.error("Error saving story:", err);
			setError(err.message || "Failed to save story.");
			throw err; // Re-throw so caller can handle
		} finally {
			setLoading(false);
		}
	};

	// Get a specific story by ID (useful for viewing)
	const getStoryById = async (id) => {
		setLoading(true);
		setError(null);
		try {
			const story = await storyStorageService.getStoryById(id);
			return story;
		} catch (err) {
			console.error(`Error fetching story ${id}:`, err);
			setError("Failed to load story.");
			return null;
		} finally {
			setLoading(false);
		}
	};

	// Delete a story
	const deleteStory = async (id) => {
		setLoading(true);
		setError(null);
		try {
			await storyStorageService.deleteStory(id);
			// Optimistically update the local state
			setStories((prevStories) => prevStories.filter((s) => s.id !== id));
		} catch (err) {
			console.error(`Error deleting story ${id}:`, err);
			setError("Failed to delete story.");
			throw err; // Re-throw so caller can handle
		} finally {
			setLoading(false);
		}
	};

	// Load stories when the hook is first used
	useEffect(() => {
		fetchStories();
	}, []); // Empty dependency array means run once on mount

	return {
		stories,
		loading,
		error,
		fetchStories, // Expose if manual refresh is needed
		saveStory,
		getStoryById,
		deleteStory,
	};
};

export default useStoryLibrary;
