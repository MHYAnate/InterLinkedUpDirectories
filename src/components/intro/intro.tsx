"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Intro() {
	const router = useRouter();

	return (
		<div className={styles.introCover}>
			<div className={styles.introBody}>
				<div className={styles.introHeader}>Inter Linked Up Directory</div>
				<div className={styles.intro}>
					<div className={styles.introPCover}>
			
				<p className={styles.introP}>Link Up Directly to Qualified Vendors, Available Vacancies and an easy to use Market, tailored to meet your individual Needs.</p>
				</div>
				
				</div>
				
			</div>
		</div>
	);
}
