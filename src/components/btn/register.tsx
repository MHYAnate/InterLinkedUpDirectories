import styles from "./styles.module.css";
import { usePathname } from "next/navigation";

const RegisterSvg: React.FC<any> = () => {

  const pathname = usePathname();

	return (
		<div className={styles.chatCoverBtnC}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill={`${pathname === "/register" ? "lightgreen" :pathname !== "/" && pathname === "/about" || pathname === "/login" ?  "lightblue" : "lightblue"}`}
				viewBox="0 0 24 24"
				strokeWidth={`${pathname === "/register" ? 1.5 :pathname !== "/" && pathname === "/about" || pathname === "/login" ?  1 : 1.5}`}
				stroke={`${pathname === "/register" ? "green" :pathname !== "/" && pathname === "/about" || pathname === "/login" ?  "blue" : "lightblue"}`}
        className={`${pathname === "/register" ? styles.activeSvgNav :pathname !== "/" && pathname === "/about" || pathname === "/login" ?  styles.inActiveSvgNav : styles.inActiveSvgNavH}`}
				// className={styles.svgSizeB}
			>
		 <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
			</svg>
		</div>
	);
};

RegisterSvg.displayName = "RegisterSvg";
export default RegisterSvg;


