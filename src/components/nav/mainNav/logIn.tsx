"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function LogIn() {

	const pathname = usePathname();
  const router = useRouter();
	
	return (
		<div
			className={`${pathname === "/login" ? styles.activeBtn :pathname !== "/" && pathname === "/about" || pathname === "/register" ?  styles.inActiveBtn : styles.inActiveBtnH}`}
			onClick={()=>router.push('/login')} 
		>
			LOG IN
		</div>
	);
}
