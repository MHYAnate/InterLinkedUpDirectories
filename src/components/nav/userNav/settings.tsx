"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function Settings() {

	const pathname = usePathname();
  const router = useRouter();
	
	return (
		<div
			className={`${styles.link} ${pathname === "/userprofile/dashboard/settings" ? styles.activeBtn : styles.inActiveBtn}`}
			onClick={()=>router.push('/userprofile/dashboard/settings')} 
		>
			SETTINGS
		</div>
	);
}
