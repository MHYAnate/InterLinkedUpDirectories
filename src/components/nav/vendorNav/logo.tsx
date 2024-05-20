"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function Logo() {
	const pathname = usePathname();
  const router = useRouter()
	return (
		<div
			className={`${styles.link} ${pathname === "/vendorprofile/dashboard" ? styles.active : styles.inActive}`}
			onClick={()=>router.push('/vendorprofile/dashboard')} 
		>
			<div className={styles.logoHead}>ILU</div>
			<div className={styles.logoTail}>D</div>
		</div>
	);
}
