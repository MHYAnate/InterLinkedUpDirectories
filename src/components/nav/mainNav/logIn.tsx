"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function LogIn() {

	const pathname = usePathname();
  const router = useRouter();
	
	return (
		<div
			className={`${styles.link} ${pathname === "/login" ? styles.activeBtn : styles.inActiveBtn}`}
			onClick={()=>router.push('/login')} 
		>
			LOG IN
		</div>
	);
}
