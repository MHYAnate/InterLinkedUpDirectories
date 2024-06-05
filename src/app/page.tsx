'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import Carousel from "@/components/carousel/carousel";
import { Services } from "@/database/data";
import Menu from "@/components/menu/menu";
import NewsLetter from "@/components/newsLetter/newsLetter";
import Nav from "@/components/nav/mainNav/nav";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Home() {
  useEffect(()=>{
		window.location.pathname;
	})

	const pathname = usePathname();

	return (
		<main  className={`${styles.link} ${pathname === "/register" ? styles.regNavBodyCover : styles.Main}`}>
			<nav className={styles.navHolder}><Nav/></nav>
			<div className={styles.body}>
			<div className={styles.carouselBody}><Carousel Services={Services}/></div>
			<div className={styles.categoryBody}><Menu Services={Services}/></div>
		 </div>
		 <div className={styles.categoryImgCover}>
							<Image
								object-fit="cover"
								className={styles.categoryImg}
								alt="Picture of the author"
								quality={100}
								width={100}
								height={100}
								src="/service/footimg.jpg"
								priority={true}
								unoptimized
							/>
						</div>
		 <div className={styles.newsLetter}>
			<NewsLetter/>
		 </div>
		</main>
	);
}
