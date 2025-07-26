// src/components/StoryViewer.jsx
import React, { useState, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import ReadingControls from "./common/ReadingControls";

// Reuse your existing CollapseIcon if not already in ReadingControls.jsx
import CollapseIcon from "./common/icons/CollapseIcon";

const StoryViewer = ({ story, onBack }) => {
	// story = { id, title, content, ... }
	const [fontSize, setFontSize] = useState("medium");
	const [readingMode, setReadingMode] = useState(false);
	const [controlsExpanded, setControlsExpanded] = useState(false);
	const [estimatedReadTime, setEstimatedReadTime] = useState(0);
	const [wordCount, setWordCount] = useState(0);
	const [openSection, setOpenSection] = useState(0);

	useEffect(() => {
		if (story?.content) {
			const words = story.content.split(/\s+/).filter(Boolean).length;
			setWordCount(words);
			const readTime = Math.ceil(words / 200);
			setEstimatedReadTime(readTime);
		}
	}, [story?.content]);

	const sections = useMemo(() => {
		if (!story?.content) return [];

		const contentSections = story.content.split(/(\n## .*\n)/).filter(Boolean);
		const result = [];
		let currentSection = { title: story.title, content: "" };

		for (const part of contentSections) {
			if (part.startsWith("\n## ")) {
				if (currentSection.content) {
					result.push(currentSection);
				}
				currentSection = {
					title: part.replace("\n## ", "").trim(),
					content: "",
				};
			} else {
				currentSection.content += part;
			}
		}
		result.push(currentSection);

		return result;
	}, [story?.content, story.title]);

	const handleToggle = (index) => {
		setOpenSection((prev) => (prev === index ? null : index));
	};

	const AccordionSection = ({ section, index, fontSize }) => (
		<div className="accordion-section">
			<button className="accordion-header" onClick={() => handleToggle(index)}>
				<h2 className="accordion-title">{section.title}</h2>
				<CollapseIcon isExpanded={openSection === index} />
			</button>
			{openSection === index && (
				<div className={`accordion-body ${fontSize}`}>
					<ReactMarkdown
						components={{
							h1: ({ node, ...props }) => (
								<h1 className="content-h1" {...props} />
							),
							h2: () => null, // Prevent nested accordion
							h3: ({ node, ...props }) => (
								<h3 className="content-h3" {...props} />
							),
							p: ({ node, ...props }) => <p className="content-p" {...props} />,
							ul: ({ node, ...props }) => (
								<ul className="content-ul" {...props} />
							),
							ol: ({ node, ...props }) => (
								<ol className="content-ol" {...props} />
							),
							li: ({ node, ...props }) => (
								<li className="content-li" {...props} />
							),
							blockquote: ({ node, ...props }) => (
								<blockquote className="content-quote" {...props} />
							),
							code: ({ node, inline, ...props }) =>
								inline ? (
									<code className="inline-code" {...props} />
								) : (
									<pre className="code-block">
										<code {...props} />
									</pre>
								),
						}}>
						{section.content}
					</ReactMarkdown>
				</div>
			)}
		</div>
	);

	if (!story) {
		return <div className="error-box">No story provided to view.</div>;
	}

	return (
		<div className={`scraped-result-card ${readingMode ? "reading-mode" : ""}`}>
			<div className="result-header">
				<div className="title-section">
					<h2 className="result-title">{story.title}</h2>
					<div className="content-meta">
						<span className="read-time">~{estimatedReadTime} min read</span>
						<span className="word-count">{wordCount} words</span>
					</div>
				</div>
				<div className="header-actions">
					{/* Optional: Add a Back button or Close button */}
					{onBack && (
						<button className="download-button" onClick={onBack}>
							{/* Use an appropriate icon, e.g., Back or Close */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								fill="currentColor"
								viewBox="0 0 16 16">
								<path
									fillRule="evenodd"
									d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
								/>
							</svg>
							<span className="btn-text">Back</span>
						</button>
					)}
				</div>
			</div>

			<ReadingControls
				fontSize={fontSize}
				onFontSizeChange={setFontSize}
				readingMode={readingMode}
				onReadingModeToggle={() => setReadingMode(!readingMode)}
				isExpanded={controlsExpanded}
				onToggleExpanded={() => setControlsExpanded(!controlsExpanded)}
			/>

			<article className={`scraped-content ${fontSize}`}>
				<div className="content-wrapper">
					{sections.map((section, index) => (
						<div key={index}>
							<AccordionSection
								key={index}
								section={section}
								index={index}
								fontSize={fontSize}
							/>
						</div>
					))}
				</div>
			</article>
		</div>
	);
};

export default StoryViewer;
