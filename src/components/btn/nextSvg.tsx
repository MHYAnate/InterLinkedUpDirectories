import styles from "./styles.module.css";

const NextSvg: React.FC<any> = () => {
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
				  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
		</div>
	);
};

NextSvg.displayName = "NextSvg";
export default NextSvg;



