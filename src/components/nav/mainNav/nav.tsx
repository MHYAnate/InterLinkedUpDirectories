"use client";
import styles from "./styles.module.css";
import Logo from "./logo";
import Register from "./signUp";
import LogIn from "./logIn";
import About from "./about";
import Search from "./search";
import { Vendors } from "@/database/serviceData";
import { MenuTab } from "./menuTab";
import Shop from "./shop";
import { usePathname } from "next/navigation";

export default function Nav() {
	const pathname = usePathname();

	return (
		<div
			className={`${
				pathname === "/register" ? styles.regNavBodyCover : pathname !== "/" && pathname === "/shop"  || pathname === "/company" ?styles.navBodyCover: pathname === "/" || pathname === "/login" || pathname === "/about"? styles.navBodyCoverH: styles.navBodyCover
			}`}
		>
			<div className={styles.navBody}>
				<div className={styles.logo}>
					<Logo />
				</div>
				<div className={styles.links}>
					<About />
					<LogIn />
					<Register />
				</div>
				<div className={styles.menu}>
					<MenuTab />
				</div>
			</div>
		</div>
	);
}
