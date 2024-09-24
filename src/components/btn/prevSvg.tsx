import styles from "./styles.module.css";

const PrevSvg: React.FC<any> = () => {
	return (
		<div className={styles.chatCoverBtnC}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className={styles.svgSizeC}
			>
				<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
		</div>
	);
};

PrevSvg.displayName = "PrevSvg";
export default PrevSvg;





