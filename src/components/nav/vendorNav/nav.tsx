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
import { MenuTab } from "./menuTab";

import { usePathname } from "next/navigation";

export default function VendorNav() {
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
					{ pathname === "/vendorprofile/dashboard/notification"  || pathname === "/vendorprofile/dashboard/settings"  ? <DashBoard/> : <></>}
				</div>
				<div className={styles.menu}><MenuTab/><SignOut /></div>
				
			</div>
		</div>
	);
}
