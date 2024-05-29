"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function Shop() {

	const pathname = usePathname();
  const router = useRouter();
	
	return (
		<div
			className={`${styles.link} ${pathname === "/dashboard/market/shop"? styles.activeBtn : styles.none}`}
			onClick={()=>router.push("/dashboard/market/shop")} 
		>
			SHOP
		</div>
	);
}
