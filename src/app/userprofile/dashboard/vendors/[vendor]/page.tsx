"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import FilterVendors from "@/components/filters/generalFilters/filterVendor";
import UserNav from "@/components/nav/userNav/nav";

export default function Page({ params }: { params: { slug: string } }) {
	const searchParams = useSearchParams();
	const src = searchParams.get("isrc");
	const name = searchParams.get("name");
	return (
		<div className={styles.Main}>
			<nav className={styles.navHolder}>
				<UserNav />
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
					<FilterVendors />
				</div>
			</div>
		</div>
	);
}
