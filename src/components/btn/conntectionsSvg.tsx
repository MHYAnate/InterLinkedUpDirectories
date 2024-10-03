import styles from "./styles.module.css";

const ConnectionsSvg: React.FC<any> = ({ state }) => {
	return (
		<div className={styles.chatCoverBtnC}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill={state !== "myContact" ? "lightblue" : "lightgreen"}
				viewBox="0 0 33 19"
				strokeWidth={1}
				stroke={state !== "myContact" ? "blue" : "green"}
				className={styles.svgSizeC}
			>
				<circle
					cx="8"
					cy="6"
					r="3.75"
					stroke={state !== "myContact" ? "blue" : "green"}
					fill={state !== "myContact" ? "lightblue" : "lightgreen"}
				/>
				<path
					d="M0.75 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 8 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
					stroke={state !== "myContact" ? "blue" : "green"}
					fill={state !== "myContact" ? "lightblue" : "lightgreen"}
				/>

				<circle
					cx="24"
					cy="6"
					r="3.75"
					stroke={state !== "myContact" ? "blue" : "green"}
					fill={state !== "myContact" ? "lightblue" : "lightgreen"}
				/>
				<path
					d="M16.75 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 24 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
					stroke={state !== "myContact" ? "blue" : "green"}
					fill={state !== "myContact" ? "lightblue" : "lightgreen"}
				/>

				<line
					x1="11.75"
					y1="6"
					x2="20.25"
					y2="6"
					stroke={state !== "myContact" ? "blue" : "green"}
				/>
			</svg>
		</div>
	);
};

ConnectionsSvg.displayName = "ConnectionsSvg";
export default ConnectionsSvg;
