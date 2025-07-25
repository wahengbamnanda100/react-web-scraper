import CollapseIcon from "./icons/CollapseIcon";

const ReadingControls = ({
	fontSize,
	onFontSizeChange,
	readingMode,
	onReadingModeToggle,
	isExpanded,
	onToggleExpanded,
}) => (
	<div className="reading-controls">
		<div className="controls-header" onClick={onToggleExpanded}>
			<span className="controls-title">Reading Settings</span>
			<CollapseIcon isExpanded={isExpanded} />
		</div>
		{isExpanded && (
			<div className="controls-content">
				<div className="font-size-control">
					<label>Text Size</label>
					<div className="font-size-buttons">
						<button
							className={`size-btn ${fontSize === "small" ? "active" : ""}`}
							onClick={() => onFontSizeChange("small")}>
							A
						</button>
						<button
							className={`size-btn ${fontSize === "medium" ? "active" : ""}`}
							onClick={() => onFontSizeChange("medium")}>
							A
						</button>
						<button
							className={`size-btn large ${
								fontSize === "large" ? "active" : ""
							}`}
							onClick={() => onFontSizeChange("large")}>
							A
						</button>
					</div>
				</div>
				<div className="reading-mode-control">
					<button
						className={`mode-btn ${readingMode ? "active" : ""}`}
						onClick={onReadingModeToggle}>
						<ReadingModeIcon />
						Focus Mode
					</button>
				</div>
			</div>
		)}
	</div>
);

export default ReadingControls;
