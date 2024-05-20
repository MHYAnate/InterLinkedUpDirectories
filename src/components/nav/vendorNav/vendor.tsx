"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function  Vendors() {

	const pathname = usePathname();
  const router = useRouter();
	
	return (
		<div
			className={`${styles.link} ${pathname === "/vendorprofile/dashboard/vendors" ? styles.activeBtn : styles.inActiveBtn}`}
			onClick={()=>router.push('/vendorprofile/dashboard/vendors')} 
		>
			VENDORS
		</div>
	);
}
