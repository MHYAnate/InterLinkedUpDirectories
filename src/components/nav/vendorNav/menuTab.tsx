"use client"
import { useState, useTransition } from "react";
import { TabButton } from "./tabBtn";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import styles from "./styles.module.css";

export const MenuTab = () => {
	const [tab, setTab] = useState("");

	const router = useRouter();

	const auth = getAuth();

	const SingOut = () => {
			signOut(auth)
			.then(() => {
				router.push("/register");
			})
			.catch((error) => {
				// An error happened.
			});
		};

  function MenuList() {

    const router = useRouter();
  
    return (
      <div className={styles.menuCover}>
        <div className={styles.flexMenu}>
        <div className={styles.menuList} onClick={() => (router.push("/vendorprofile/dashboard/vendors"), setTab(""))}>VENDORS</div>
				<div className={styles.menuList} onClick={() => (router.push("/vendorprofile/dashboard/vacancy"), setTab(""))}>VACANCY</div>
				<div className={styles.menuList} onClick={() => (router.push("/vendorprofile/dashboard/marketing"), setTab(""))}>MARKET</div>
          <div className={styles.menuList} onClick={() => (router.push("/vendorprofile/dashboard/notification"), setTab(""))}>NOTIFICATION</div>
  
          <div className={styles.menuList} onClick={() => (router.push("/vendorprofile/dashboard/settings"), setTab(""))}>SETTINGS</div>
					<div className={styles.menuList} onClick={() => SingOut}>SignOut</div>
        </div>
      </div>
    );
  }

	return (
		<>
			<TabButton
				onClick={() => (tab === "menu" ? setTab("") : setTab("menu"))}
			>
				<div className={styles.tabSvg}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className={styles.navSvg}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</div>
			</TabButton>
			
			{tab === "menu" && (
				<div>
					<MenuList />
				</div>
			)}
		</>
	);
};
