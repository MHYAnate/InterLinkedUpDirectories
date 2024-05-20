"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function Logo() {
	const pathname = usePathname();
  const router = useRouter()
	return (
		<div
			className={`${styles.link} ${pathname === "/userprofile/dashboard" ? styles.active : styles.inActive}`}
			onClick={()=>router.push('/userprofile/dashboard')} 
		>
			<div className={styles.logoHead}>ILU</div>
			<div className={styles.logoTail}>D</div>
		</div>
	);
}
