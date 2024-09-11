"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
import AboutSvg from "@/components/btn/about"; 


export default function About() {
	const pathname = usePathname();
  const router = useRouter()
	return (
		<div
			className={`${pathname === "/about" ? styles.activeBtn :pathname !== "/" &&pathname === "/register" || pathname === "/login" ?  styles.inActiveBtn : styles.inActiveBtnH}`}
			onClick={()=>router.push('/about')} 
		><AboutSvg/>
			ABOUT US
		</div>
	);
}