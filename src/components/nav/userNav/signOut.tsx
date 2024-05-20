"use client";
import styles from "./styles.module.css";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

export default function SignOut() {
	const pathname = usePathname();
  const router = redirect;

	const auth = getAuth();

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
		<div className={`${styles.link} ${pathname === "/userprofile/dashboard/settings" ? styles.activeBtn : styles.inActiveBtn}`} onClick={SingOut}>
			SIGN OUT
		</div>
	);
}
