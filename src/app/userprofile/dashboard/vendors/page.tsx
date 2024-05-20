"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import FilterVendorsCategory from "@/components/filters/generalFilters/filterVendorsCategory";
import UserNav from "@/components/nav/userNav/nav";

export default function Page({ params }: { params: { slug: string } }) {
	const searchParams = useSearchParams();
	const src = searchParams.get("src");
	const name = searchParams.get("name");
	return (
		<div className={styles.Main}>
			<nav className={styles.navHolder}>
				<UserNav />
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
					<FilterVendorsCategory />
				</div>
			</div>
		</div>
	);
}
