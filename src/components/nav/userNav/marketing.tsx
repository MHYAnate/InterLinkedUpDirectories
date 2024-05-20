"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function Marketing() {

	const pathname = usePathname();
  const router = useRouter();
	
	return (
		<div
			className={`${styles.link} ${pathname === "/userprofile/dashboard/market"? styles.activeBtn : styles.inActiveBtn}`}
			onClick={()=>router.push("/userprofile/dashboard/market")} 
		>
			MARKET
		</div>
	);
}
