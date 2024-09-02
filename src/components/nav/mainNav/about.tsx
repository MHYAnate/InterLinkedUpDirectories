"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function About() {
	const pathname = usePathname();
  const router = useRouter()
	return (
		<div
			className={`${pathname === "/about" ? styles.activeBtn :pathname !== "/" &&pathname === "/register" || pathname === "/login" ?  styles.inActiveBtn : styles.inActiveBtnH}`}
			onClick={()=>router.push('/about')} 
		>
			ABOUT US
		</div>
	);
}