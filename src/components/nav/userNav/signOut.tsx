"use client";
import styles from "./styles.module.css";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import Firebase from "@/firebase/firebase";

export default function SignOut() {
	const pathname = usePathname();
  const router = redirect;

	const { auth } = Firebase;


	const SingOut = () => {
			signOut(auth)
			.then(() => {
				router("/register");
			})
			.catch((error) => {
				// An error happened.
			});
		};

		

	return (
		<div className={`${styles.link} ${pathname === "/vendorprofile" ? styles.activeBtn : styles.inActiveSignOutBtn}`} onClick={SingOut}>
			SIGN OUT
		</div>
	);
}
