import Image from "next/image";
import styles from "./styles.module.css";
import VendorNav from "@/components/nav/userNav/nav";
import { Suspense } from 'react'
import Loading from "@/app/register/logo";


export default function About() {
	return (
		<Suspense fallback={<Loading/>}>
		<div className={styles.Main}>
			<nav className={styles.navHolder}><VendorNav/></nav>
		<main className={styles.aboutUsCover}>
			<div className={styles.titleCover}>
				<div className={styles.categoryCover}>
					<div className={styles.categoryImgCover}>
						<Image
							object-fit="cover"
							className={styles.categoryImg}
							alt="Picture of the author"
							quality={100}
							width={100}
							height={100}
							src="/service/abt2.jpg"
							priority={true}
							unoptimized
						/>
					</div>
					<div className={styles.title}>
						<div className={styles.flextitle}>
						
						</div>
					</div>
				</div>
			</div>
			<div className={styles.aboutUs}>
		
			</div>
		</main>
		</div>
		</Suspense>
	);
}
