"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function Company() {

	const pathname = usePathname();
  const router = useRouter();
	
	return (
		<div
			className={`${styles.link} ${pathname === "/vendorprofile/dashboard/vacancies/company"? styles.activeBtn : styles.none}`}
			onClick={()=>router.push("/vendorprofile/dashboard/vacancies/company")} 
		>
			COMPANY
		</div>
	);
}
