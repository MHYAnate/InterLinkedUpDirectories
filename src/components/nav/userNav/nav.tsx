"use client";
import styles from "./styles.module.css";
import Logo from "./logo";
import Notification from "./notification";
import Settings from "./settings";
import SignOut from "./signOut";
import DashBoard from "./dashboard";
import Vacancies from "./vacancies";
import Marketing from "./marketing";
import Vendors from "./vendor";
import { usePathname } from "next/navigation";

export default function UserNav() {
	const pathname = usePathname();
	return (
		<div className={styles.navBodyCover}>
			<div className={styles.navBody}>
				<div className={styles.logo}>
					<Logo />
				</div>
				<div className={styles.search}></div>
				<div className={styles.links}>
					<Vendors />
          <Vacancies />
          <Marketing />
					<Notification />
					<Settings />
					<SignOut />
					{ pathname === "/userprofile/dashboard/notification"  || pathname === "/userprofile/dashboard/settings"  ? <DashBoard/> : <></>}
				</div>
				<div className={styles.menu}></div>
			</div>
		</div>
	);
}
