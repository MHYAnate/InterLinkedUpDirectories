"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
import RegisterSvg from "@/components/btn/register"; 


export default function Register() {
	const pathname = usePathname();
  const router = useRouter()
	return (
		<div
			className={`${pathname === "/register" ? styles.activeBtn :pathname !== "/" && pathname === "/about" || pathname === "/login" ?  styles.inActiveBtn : styles.inActiveBtnH}`}
			onClick={()=>router.push('/register')} 
		><RegisterSvg/>
		<span className={styles.navSpan}>REGISTER</span>
			
		</div>
	);
}