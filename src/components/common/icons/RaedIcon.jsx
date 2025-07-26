// src/components/common/icons/ReadingModeIcon.jsx
import React from "react";

// --- Enhanced Reading Mode Icon ---
// Represents focusing on text, perhaps with a cursor bar
const ReadingModeIcon = ({
	width = 18,
	height = 18,
	fill = "currentColor",
	...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		fill={fill}
		viewBox="0 0 16 16"
		{...props} // Allow passing additional props like className or style
	>
		{/* Top text line */}
		<rect x="2" y="4" width="12" height="1" rx="0.5" fill={fill} />
		{/* Middle text line (slightly longer) */}
		<rect x="2" y="7" width="10" height="1" rx="0.5" fill={fill} />
		{/* Bottom text line */}
		<rect x="2" y="10" width="12" height="1" rx="0.5" fill={fill} />
		{/* Vertical focus/cursor bar */}
		<rect x="5" y="3" width="1" height="9" rx="0.5" fill={fill} opacity="0.8" />
	</svg>
);

export default ReadingModeIcon;
