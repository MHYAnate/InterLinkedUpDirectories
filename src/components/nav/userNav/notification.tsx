"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function Notification() {

	const pathname = usePathname();
  const router = useRouter();
	
	return (
		<div
			className={`${styles.link} ${pathname === "/dashboard/notification"? styles.activeBtn : styles.inActiveBtn}`}
			onClick={()=>router.push("/dashboard/notification")} 
		>
			NOTIFICATION
		</div>
	);
}
