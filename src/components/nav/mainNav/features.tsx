"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'


export default function Features() {
	const pathname = usePathname();
  const router = useRouter()
	return (
		<div
			className={`${pathname === "/about" ? styles.activeBtn :pathname !== "/" &&pathname === "/register" || pathname === "/login" ?  styles.inActiveBtn : styles.inActiveBtnH}`}
		
		>
		<span className={styles.navSpan}>FEATURES</span>
			
		</div>
	);
}