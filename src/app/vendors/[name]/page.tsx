"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from 'react'
import Loading from "@/app/register/logo";
import Image from "next/image";
import FilterVendors from "@/components/filters/singularFilter/filterVendor";
import Nav from "@/components/nav/mainNav/nav";
import Hero from "@/components/hero/hero";
import NewsLetter from "@/components/newsLetter/newsLetter";

export default function Page({ params }: { params: { slug: string } }) {
	const searchParams = useSearchParams();
	const src = searchParams.get("isrc");
	const name = searchParams.get("name");
	return (
		<Suspense fallback={<Loading/>}>
		<div className={styles.Main}>
			<nav className={styles.navHolder}>
				<Nav />
			</nav>
			<div>
				<Hero/>
			</div>
			<div className={styles.pageBodyCover}>
				<div className={styles.idBody}>
					<div className={styles.idName}>{name} Vendors</div>
					<div className={styles.imgCover}>
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
					<FilterVendors />
				</div>
			</div>
			<NewsLetter/>
		</div>
		</Suspense>
	);
}
