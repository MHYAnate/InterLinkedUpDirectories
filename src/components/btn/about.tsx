import styles from "./styles.module.css";
import { usePathname } from "next/navigation";

const AboutSvg: React.FC<any> = () => {

  const pathname = usePathname();

	return (
		<div className={styles.chatCoverBtnC}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill={`${pathname === "/about" ? "lightgreen" :pathname !== "/" &&pathname === "/register" || pathname === "/login" ?  "lightblue" : "lightblue"}`}
				viewBox="0 0 24 24"
				strokeWidth={`${pathname === "/about" ? 1 :pathname !== "/" &&pathname === "/register" || pathname === "/login" ?  0.5 : 1}`}
				stroke={`${pathname === "/about" ? "green" :pathname !== "/" &&pathname === "/register" || pathname === "/login" ?  "blue" : "white"}`}
        className={`${pathname === "/about" ? styles.activeSvgNav :pathname !== "/" &&pathname === "/register" || pathname === "/login" ?  styles.inActiveSvgNav : styles.inActiveSvgNavH}`}
				// className={styles.svgSizeB}
			>
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
			</svg>
		</div>
	);
};

AboutSvg.displayName = "AboutSvg";
export default AboutSvg;



