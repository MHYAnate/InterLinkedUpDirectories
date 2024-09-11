import styles from "./styles.module.css";
import { usePathname } from "next/navigation";

const LogInSvg: React.FC<any> = () => {

  const pathname = usePathname();

	return (
		<div className={styles.chatCoverBtnC}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill={`${pathname === "/login" ? "lightgreen" :pathname !== "/" && pathname === "/about" || pathname === "/register" ?  "lightblue" : "lightblue"}`}
				viewBox="0 0 24 24"
				strokeWidth={`${pathname === "/login" ? 1 :pathname !== "/" && pathname === "/about" || pathname === "/register" ?  0.5 : 1}`}
				stroke={`${pathname === "/login" ? "green" :pathname !== "/" && pathname === "/about" || pathname === "/register" ?  "blue" : "white"}`}
        className={`${pathname === "/login" ? styles.activeSvgNav :pathname !== "/" && pathname === "/about" || pathname === "/register" ?  styles.inActiveSvgNav : styles.inActiveSvgNavH}`}
				// className={styles.svgSizeB}
			>
		<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
			</svg>
		</div>
	);
};

LogInSvg.displayName = "LogInSvg";
export default LogInSvg;




