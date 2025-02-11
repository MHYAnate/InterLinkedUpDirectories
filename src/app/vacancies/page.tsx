"use client";
import styles from "./styles.module.css";
import {useState} from 'react'
import Image from "next/image";
import VacanciesFilter from "@/components/filters/singularFilter/filterVacancies";
import Nav from "@/components/nav/mainNav/nav";
import { Suspense } from 'react'
import Loading from "@/app/register/logo";

export default function Page() {
	const [a,sa]= useState("");
	return (
		<Suspense fallback={<Loading/>}>
		<div className={styles.Main}>
		<nav className={styles.navHolder}>
				<Nav setQNav={sa} qNav="" />
			</nav>
		<div className={styles.pageBodyCover}>
			<div className={styles.idBody}>
				<div className={styles.idName}>Vacancies Space</div>
        <div>
				<Image
					className={styles.idiImg}
					src="/service/vacancy.jpg"
					alt="Picture of the author"
					width={500}
					height={500}
					unoptimized
					quality={100}
				/>
        </div>
			</div>
			<div className={styles.bodyCover}>
				<VacanciesFilter/>
      </div>
		</div>
		</div>
		</Suspense>
	);
}
