"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function Vacancies() {

	const pathname = usePathname();
  const router = useRouter();
	
	return (
		<div
			className={`${styles.link} ${pathname === "/userprofile/dashboard/vacancies"? styles.activeBtn : styles.inActiveBtn}`}
			onClick={()=>router.push("/userprofile/dashboard/vacancies")} 
		>
			VACANCIES
		</div>
	);
}
