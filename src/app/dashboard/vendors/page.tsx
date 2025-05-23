"use client";
import styles from "./styles.module.css";
import {  useSearchParams } from "next/navigation";
import { Suspense } from 'react'
import Loading from "@/app/register/logo";
import Image from "next/image";
import VendorNav from "@/components/nav/userNav/nav";

export default function Page() {
	const searchParams = useSearchParams();
	const src = searchParams.get("src");
	const name = searchParams.get("name");
	return (
		<Suspense fallback={<Loading/>}>
		<div className={styles.Main}>
			<nav className={styles.navHolder}>
				<VendorNav />
			</nav>
			<div className={styles.pageBodyCover}>
				<div className={styles.idBody}>
					<div className={styles.idName}>{name} Vendors category</div>
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
