"use client";
import styles from "./styles.module.css";
import Logo from "./logo";
import Register from "./signUp";
import LogIn from "./logIn";
import About from "./about";
import { MenuTab } from "./menuTab";
import { usePathname } from "next/navigation";
import Features from "./features";


interface Props {
	setQNav: (value: string) => void;
	qNav: string;
}


export default function Nav({setQNav, qNav}:Props) {
	const pathname = usePathname();

	return (
		<div
			className={`${
				pathname === "/register" ? styles.navBodyCoverH : pathname !== "/" && pathname === "/shop"  || pathname === "/company" ?styles.navBodyCover: pathname === "/" || pathname === "/login" || pathname === "/about"? styles.navBodyCoverH: styles.navBodyCover
			}`}
		>
			<div className={styles.navBody}>
				<div onClick={()=>{qNav !== "home" ? setQNav("home") : setQNav("")}} className={styles.logo}>
					<Logo />
				</div>
				<div className={styles.links}>
					<div onClick={()=>{qNav !== "features"?setQNav("features"): setQNav("")}}>
						<div className={pathname !== "/"? styles.hide:""}>	<Features/></div>
					
					</div>
					<div>
						<LogIn />
					</div>
					<div>
						<Register />
					</div>
				</div>
				<div className={styles.menu}>
					<MenuTab setQNav={setQNav} />
				</div>
			</div>
		</div>
	);
}
