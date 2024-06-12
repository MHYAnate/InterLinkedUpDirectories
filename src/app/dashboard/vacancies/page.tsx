"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import VacanciesFilter from "@/components/filters/singularFilter/filterVacancies";
import VendorNav from "@/components/nav/userNav/nav";
import { Suspense } from 'react'
import Loading from "@/app/register/logo";

export default function Page({ params }: { params: { slug: string } }) {
	const searchParams = useSearchParams();
	const src = searchParams.get("isrc");
	const name = searchParams.get("name");
	return (
		<Suspense fallback={<Loading/>}>
		<div className={styles.Main}>
		<nav className={styles.navHolder}>
				<VendorNav  />
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
