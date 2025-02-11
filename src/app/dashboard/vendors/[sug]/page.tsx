"use client";
import styles from "./styles.module.css";
import {useSearchParams } from "next/navigation";
import { Suspense, useState } from 'react'
import Loading from "@/app/register/logo";
import Image from "next/image";
import Nav from "@/components/nav/mainNav/nav";

export default function Page() {
	const searchParams = useSearchParams();
	const src = searchParams.get("isrc");
	const name = searchParams.get("name");
	const [a, setA]= useState("")
	return (
		<Suspense fallback={<Loading/>}>
		<div className={styles.Main}>
			<nav className={styles.navHolder}>
				< Nav  setQNav={setA} qNav={a}/>
			</nav>
			<div className={styles.pageBodyCover}>
				<div className={styles.idBody}>
					<div className={styles.idName}>{name} Vendors</div>
					<div>
						<Image
							className={styles.idiImg}
							src={`${src}`}
							alt={`${name}`}
							width={500}
							height={500}
							unoptimized
							quality={100}
						/>
					</div>
				</div>
				<div className={styles.bodyCover}>
					
				</div>
			</div>
		</div>
		</Suspense>
	);
}
