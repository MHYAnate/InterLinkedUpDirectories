"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
 


export default function Register() {
	const pathname = usePathname();
  const router = useRouter()
	return (
		<div
			className={`${pathname === "/register" ? styles.activeBtn :pathname !== "/" && pathname === "/about" || pathname === "/login" ?  styles.inActiveBtn : styles.inActiveBtnH}`}
			onClick={()=>router.push('/register')} 
		>
			REGISTER
		</div>
	);
}