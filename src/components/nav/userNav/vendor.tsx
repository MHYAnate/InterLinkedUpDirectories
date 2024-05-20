"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function Vendors() {

	const pathname = usePathname();
  const router = useRouter();
	
	return (
		<div
			className={`${styles.link} ${pathname === "/userprofile/dashboard/vendors" ? styles.activeBtn : styles.inActiveBtn}`}
			onClick={()=>router.push('/userprofile/dashboard/vendors')} 
		>
			VENDORS
		</div>
	);
}
