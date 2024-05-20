"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Page({ params }: { params: { slug: string } }) {
	const searchParams = useSearchParams();
	const src = searchParams.get("src");
	const name = searchParams.get("name");
	return (
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
				/>
        </div>
			</div>
			<div className={styles.bodyCover}>
      </div>
		</div>
	);
}
