"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function DashBoard() {

	const pathname = usePathname();
  const router = useRouter();
	
	return (
		<div
			className={`${styles.link} ${pathname === "/dashboard" ? styles.activeBtn : styles.inActiveBtn}`}
			onClick={()=>router.push('/dashboard')} 
		>
			DASHBOARD
		</div>
	);
}
