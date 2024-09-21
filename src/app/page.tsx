"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import Carousel from "@/components/carousel/carousel";
import { Services } from "@/database/data";
import Menu from "@/components/menu/menu";
import NewsLetter from "@/components/newsLetter/newsLetter";
import Nav from "@/components/nav/mainNav/nav";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import ItemsFilter from "@/components/filters/singularFilter/filterItems";
import ShopsFilter from "@/components/filters/singularFilter/filterShops";
import CompanyFilter from "@/components/filters/singularFilter/filterCompany";
import VacanciesFilter from "@/components/filters/singularFilter/filterVacancies";
import Hero from "@/components/hero/hero";
import ItemSvg from "@/components/btn/itemSvg";
import ShopSvg from "@/components/btn/shopSvg";
import VacancySvg from "@/components/btn/vacancySvg";
import OfficeSvg from "@/components/btn/officeSvg";




export default function Home() {
	
	useEffect(() => {
		window.location.pathname;
	});

	const pathname = usePathname();

	const [selector, setSelector] = useState("Items");

	const [isSticky, setIsSticky] = useState(false);


	useEffect(() => {

		const handleScroll = () => {
			if (window.scrollY > 1) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};
	
		window.addEventListener('scroll', handleScroll);
	
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	

	return (
		<main
			className={`${styles.link} ${
				pathname === "/register" ? styles.regNavBodyCover : styles.Main
			}`}
		>
			<nav className={isSticky?styles.navHolderFix:styles.navHolder}>
					<Nav />
			</nav>
			<div className={isSticky?styles.bodyFix:styles.body}>
			<Hero />	
				<div className={styles.categoryCover}>
					<div className={styles.coverVendors}>
						<Carousel Services={Services} />
					</div>
					<div className={styles.coverJobsMarket}>
						<div className={styles.coverSelectJobsMarket}>
							<div className={styles.coverSelect}>
							
								<div className={styles.coverSelectBtn}>
									<div
										onClick={
											selector !== "vacancies"
												? () => setSelector("vacancies")
												: () => setSelector("")
										}
										onMouseEnter={()=>{
											setSelector("vacancies")
										}}
										className={
											selector !== "vacancies"
												? styles.selectBtn
												: styles.selectBtnHighlighted
										}
									><VacancySvg selector={selector} />
										<span className={styles.catSpan}>Vacancies</span>
										
									</div>
									<div
										onClick={
											selector !== "Companies"
												? () => setSelector("Companies")
												: () => setSelector("")
										}
										onMouseEnter={()=>{
											setSelector("Companies")
										}}
										className={
											selector !== "Companies"
												? styles.selectBtn
												: styles.selectBtnHighlighted
										}
									><OfficeSvg selector={selector} />	
										<span className={styles.catSpan}>Companies</span>
									</div>
								</div>
							</div>
							<div className={styles.coverSelect}>
							
								<div className={styles.coverSelectBtn}>
									<div
										onClick={
											selector !== "Items"
												? () => setSelector("Items")
												: () => setSelector("")
										}
										onMouseEnter={()=>{
											setSelector("Items")
										}}
										className={
											selector !== "Items"
												? styles.selectBtn
												: styles.selectBtnHighlighted
										}
									><ItemSvg selector={selector}/>
									<span className={styles.catSpan}>Items</span>
										
									</div>
									<div
										onClick={
											selector !== "Shops"
												? () => setSelector("Shops")
												: () => setSelector("")
										}
										onMouseEnter={()=>{
											setSelector("Shops")
										}}
										className={
											selector !== "Shops"
												? styles.selectBtn
												: styles.selectBtnHighlighted
										}
									><ShopSvg selector={selector} />
									<span className={styles.catSpan}>Shops</span>
										
									</div>
								</div>
							</div>
						</div>
						<div className={styles.coverRenderSelectCategory}>
							{selector === "Items" && (
								<>
									<ItemsFilter />
								</>
							)}
							{selector === "Shops" && (
								<>
									<ShopsFilter />
								</>
							)}
							{selector === "vacancies" && (
								<>
									<VacanciesFilter />
								</>
							)}
							{selector === "Companies" && (
								<>
								<CompanyFilter/>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.newsLetter}>
				<NewsLetter />
			</div>
		</main>
	);
}
