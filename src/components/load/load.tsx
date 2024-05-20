"use client";
import styles from "./styles.module.css";
 



export default function Loader() {



	return (
		<div className={styles.loaderContainer}>
			<svg  viewBox="0 0 400 160" className={styles.svg}>
			<text x="50%" y="50%" dy=".23em" textAnchor="middle" className={styles.svgTextF}>
				I
				</text>
				<text x="50%" y="50%" dy=".23em" textAnchor="middle" className={styles.svgText}>
				LU
				</text>
				<text x="50%" y="50%" dy=".23em" textAnchor="middle" className={styles.svgTextT}>
				D
				</text>
			</svg>
		</div>
	);
}