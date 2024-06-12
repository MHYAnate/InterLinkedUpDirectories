"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

import Nav from "@/components/nav/mainNav/nav";
import { Suspense } from 'react'
import Loading from "../register/logo";


export default function Page({ params }: { params: { slug: string } }) {

	return (
		<Suspense fallback={<Loading/>}>
		<div className={styles.Main}>
			<Nav/>
		<div className={styles.pageBodyCover}>
			<div className={styles.idBody}>
				<div className={styles.idName}>Market</div>
        <div>
				<Image
					className={styles.idiImg}
					src="/service/commerce.jpg"
					alt="Picture of the author"
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
