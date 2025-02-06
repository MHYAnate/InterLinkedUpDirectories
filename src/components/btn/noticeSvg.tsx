import styles from "./styles.module.css";

const NoticeSvg: React.FC<any> = ({ lenght, state }) => {
	return (
		<div className={styles.chatCoverBtnC}>
			{lenght ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill={state !== "notice"?"lightblue":"lightgreen"}
					viewBox="0 0 24 24"
					strokeWidth={1}
					stroke={state !== "notice"?"blue":"green"}
					className={styles.svgSizeC}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
					/>
				</svg>
			) : (
				<svg
				xmlns="http://www.w3.org/2000/svg"
				fill={state !== "notice"?"lightblue":"lightgreen"}
				viewBox="0 0 24 24"
				strokeWidth={1}
				stroke={state !== "notice"?"blue":"green"}
				className={styles.svgSizeC}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"
					/>
				</svg>
			)}
		</div>
	);
};

NoticeSvg.displayName = "NoticeSvg";
export default NoticeSvg;
