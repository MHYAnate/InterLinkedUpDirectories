"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function Marketing() {

	const pathname = usePathname();
  const router = useRouter();
	
	return (
		<div
			className={`${styles.link} ${pathname === "/vendorprofile/dashboard/market"? styles.activeBtn : styles.inActiveBtn}`}
			onClick={()=>router.push("/vendorprofile/dashboard/market")} 
		>
			MARKET
		</div>
	);
}
