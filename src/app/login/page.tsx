"use client";
import React, { useState, Suspense, useEffect } from "react";
import styles from "./styles.module.css";
import Nav from "@/components/nav/mainNav/nav";
import LogInComponent from "@/components/auth/signIn";


export default function LogInPage() {

	const [is, setIs] = useState("");




	return (
		<div className={styles.registerPage}>
			<header className={styles.header}>
				<Nav setQNav={setIs} qNav={is}/>
			</header>

			<main className={styles.mainContent}>
				<LogInComponent/>
			</main>
		</div>
	);
}
