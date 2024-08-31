import styles from "./styles.module.css";

const DropSvg: React.FC<any> = () => {
	return (
		<div className={styles.chatCoverBtnC}>
      arrowDown
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className={styles.svgSizeC}
			>
				  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>

arrowUp
        <svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className={styles.svgSizeC}
			>
				  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
        
		</div>
	);
};

DropSvg.displayName = "DropSvg";
export default DropSvg;
