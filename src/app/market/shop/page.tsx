"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

import Nav from "@/components/nav/mainNav/nav";

export default function Page({ params }: { params: { slug: string } }) {

	const searchParams = useSearchParams();
	const shopName= searchParams.get("shopName");
	const shopPic = searchParams.get("shopPic");
  const shopId = searchParams.get("shopId");
	const email = searchParams.get("email");


	return (
		<div className={styles.Main}>
			<nav className={styles.navHolder}>
				<Nav />
			</nav>
			<div className={styles.pageBodyCover}>
				<div className={styles.idBody}>
					<div className={styles.idName}>{shopName}</div>
					<div className={styles.imgCover}>
						<Image
							className={styles.idiImg}
							src={`${shopPic}`}
							alt={`${shopName}`}
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
	);
}
