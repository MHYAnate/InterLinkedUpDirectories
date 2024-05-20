"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function Register() {
	const pathname = usePathname();
  const router = useRouter()
	return (
		<div
			className={`${styles.link} ${pathname === "/register" ? styles.activeBtn : styles.inActiveBtn}`}
			onClick={()=>router.push('/register')} 
		>
			REGISTER
		</div>
	);
}