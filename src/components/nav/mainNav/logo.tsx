"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function Logo() {
	const pathname = usePathname();
  const router = useRouter()
	return (
		<div
			className={`${pathname === "/"|| pathname !== "/about" && pathname !== "/login" && pathname !== "/register" ? styles.activeH : styles.active}`}
			onClick={()=>router.push('/')} 
		>
			<div className={styles.logoHead}>ILU</div>
			<div className={styles.logoTail}>D</div>
		</div>
	);
}
