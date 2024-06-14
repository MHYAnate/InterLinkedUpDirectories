import Image from "next/image";
import styles from "./styles.module.css";
import Nav from "@/components/nav/mainNav/nav";
import { Suspense } from "react";
import Loading from "../register/logo";
import AboutUs from "@/components/about/aboutUs";

export default function About() {
	return (
		<Suspense fallback={<Loading />}>
			<div className={styles.Main}>
				<nav className={styles.navHolder}>
					<Nav />
				</nav>
				<main className={styles.aboutUsCover}>
					<AboutUs />
				</main>
			</div>
		</Suspense>
	);
}
