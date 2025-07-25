const CollapseIcon = ({ isExpanded }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		fill="currentColor"
		viewBox="0 0 16 16"
		style={{
			transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
			transition: "transform 0.3s ease",
		}}>
		<path
			fillRule="evenodd"
			d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
		/>
	</svg>
);

export default CollapseIcon;
