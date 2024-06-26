import { useState, useTransition } from "react";
import { TabButton } from "./tabBtn";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export const MenuTab = () => {
	const [tab, setTab] = useState("");

  function MenuList() {

    const router = useRouter();
  
    return (
      <div className={styles.menuCover}>
        <div className={styles.flexMenu}>
          <div className={styles.menuList} onClick={() => (router.push("/about"), setTab(""))}>ABOUT US</div>
  
          <div className={styles.menuList} onClick={() => (router.push("/login"), setTab(""))}>LOG IN</div>
  
          <div className={styles.menuList} onClick={() => (router.push("/register"), setTab(""))}>REGISTER</div>
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
						stroke="darkgreen"
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
