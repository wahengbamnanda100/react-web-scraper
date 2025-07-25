// src/services/storyStorageService.js

// --- Using localStorage for now ---
const STORAGE_KEY = "storyLibrary";

// Helper to get the current library array
const getLibrary = () => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch (error) {
		console.error("Error reading library from localStorage:", error);
		return [];
	}
};

// Helper to save the library array
const saveLibrary = (library) => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
	} catch (error) {
		console.error("Error saving library to localStorage:", error);
		throw error; // Re-throw to let the hook handle it
	}
};

// --- Service Functions ---
export const storyStorageService = {
	// Get all saved stories (metadata)
	getAllStories: async () => {
		return new Promise((resolve) => {
			// Simulate async for potential IDB migration
			setTimeout(() => resolve(getLibrary()), 0);
		});
	},

	// Get a single story by its ID
	getStoryById: async (id) => {
		return new Promise((resolve, reject) => {
			try {
				const library = getLibrary();
				const story = library.find((s) => s.id === id);
				resolve(story || null);
			} catch (error) {
				reject(error);
			}
		});
	},

	// Save a new story
	saveStory: async (storyData) => {
		// storyData should include { id, title, content, ... }
		return new Promise((resolve, reject) => {
			try {
				const library = getLibrary();
				// Check for duplicates if necessary (e.g., by URL or ID)
				if (library.some((s) => s.id === storyData.id)) {
					console.warn("Story with this ID already exists.");
					// Decide: Update or reject? Let's reject for simplicity.
					reject(new Error("Story ID already exists."));
					return;
				}
				const updatedLibrary = [...library, storyData];
				saveLibrary(updatedLibrary);
				resolve(storyData); // Return the saved story
			} catch (error) {
				reject(error);
			}
		});
	},

	// Delete a story by ID
	deleteStory: async (id) => {
		return new Promise((resolve, reject) => {
			try {
				const library = getLibrary();
				const updatedLibrary = library.filter((s) => s.id !== id);
				saveLibrary(updatedLibrary);
				resolve(); // Resolve on successful deletion
			} catch (error) {
				reject(error);
			}
		});
	},

	// Optional: Update an existing story
	updateStory: async (id, updatedData) => {
		return new Promise((resolve, reject) => {
			try {
				const library = getLibrary();
				const index = library.findIndex((s) => s.id === id);
				if (index === -1) {
					reject(new Error("Story not found for update."));
					return;
				}
				library[index] = { ...library[index], ...updatedData };
				saveLibrary(library);
				resolve(library[index]);
			} catch (error) {
				reject(error);
			}
		});
	},
};
