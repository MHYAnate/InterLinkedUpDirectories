"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
import LogInSvg from "@/components/btn/logIn";


export default function LogIn() {

	const pathname = usePathname();
  const router = useRouter();
	
	return (
		<div
			className={`${pathname === "/login" ? styles.activeBtn :pathname !== "/" && pathname === "/about" || pathname === "/register" ?  styles.inActiveBtn : styles.inActiveBtnH}`}
			onClick={()=>router.push('/login')} 
		><LogInSvg/>
			<span className={styles.navSpan}>LOG IN</span>
		</div>
	);
}
