"use client";
import styles from "./styles.module.css";
import Logo from "./logo";
import Notification from "./notification";
import Settings from "./settings";
import SignOut from "./signOut";
import DashBoard from "./dashboard";
import Vacancies from "./vacancies";
import Marketing from "./marketing";
import Vendor from "./vendor";
import Search from "./search";
import { Vendors } from "@/database/serviceData";
import { MenuTab } from "./menuTab";
import { usePathname } from "next/navigation";
import Company from "./company";
import Shop from "./shop";
import About from "./about";

export default function VendorNav() {



	
	const pathname = usePathname();
	return (
		<div className={styles.navBodyCover}>
			<div className={styles.navBody}>
				<div className={styles.logo}>
					<Logo />
				</div>
				<div className={styles.search}><Search suggestionsList={Vendors}/></div>
				<div className={styles.links}>
					<Shop/>
					<Company/>
					<Vendor />
					<Vacancies />
					<Marketing />
					<About/>
					<Notification />
					<Settings />
					{ pathname !== "/dashboard" ? <DashBoard/> : <></>}
					<SignOut />
				</div>
				<div className={styles.menu}><MenuTab/></div>
				
			</div>
		</div>
	);
}
