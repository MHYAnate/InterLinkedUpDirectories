"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function About() {
	const pathname = usePathname();
  const router = useRouter()
	return (
		<div
			className={`${styles.link} ${pathname === "/about" ? styles.activeBtn : styles.inActiveBtn}`}
			onClick={()=>router.push('/about')} 
		>
			ABOUT US
		</div>
	);
}