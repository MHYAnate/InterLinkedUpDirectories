"use client";
import styles from "./styles.module.css";
import NewsLetter from "@/components/newsLetter/newsLetter";
import Nav from "@/components/nav/mainNav/nav";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import ItemsFilter from "@/components/filters/singularFilter/filterItems";
import ShopsFilter from "@/components/filters/singularFilter/filterShops";
import CompanyFilter from "@/components/filters/singularFilter/filterCompany";
import VacanciesFilter from "@/components/filters/singularFilter/filterVacancies";
import Hero from "@/components/hero/hero";




export default function Home() {
	
	const [qNav, setQNav] = useState("")
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

	const q1 = useRef<HTMLDivElement>(null);

	const q2 = useRef<HTMLDivElement>(null);

	const qView1 = () => q1.current?.scrollIntoView({ behavior: "smooth" });

	const qView2 = () => q2.current?.scrollIntoView({ behavior: "smooth" });

	useEffect(() => {
		if (qNav === "home") {
			qView1();
		}
		if (qNav === "features") {
			qView2();
		}
	}, [qNav, setQNav]);
	

	return (
		<main
		ref={q1}
			className={`${styles.link} ${
				pathname === "/register" ? styles.regNavBodyCover : styles.Main
			}`}
		>
			<nav className={isSticky?styles.navHolderFix:styles.navHolder}>
					<Nav setQNav={setQNav} qNav={qNav} />
			</nav>
			<div className={isSticky?styles.bodyFix:styles.body}>
			<Hero setQNav={setQNav} qNav={qNav} />	
			<div ref={q2} className={styles.features}> Features</div>
				<div  className={styles.categoryCover}>
					<div  className={styles.coverJobsMarket}>
						<div className={styles.coverSelectJobsMarket}>
							<div className={styles.coverSelect}>
							
								<div className={styles.coverSelectBtn}>
									<div
										onClick={
											selector !== "vacancies"
												? () => setSelector("vacancies")
												: () => setSelector("")
										}
										// onMouseEnter={()=>{
										// 	setSelector("vacancies")
										// }}
										className={
											selector !== "vacancies"
												? styles.selectBtn
												: styles.selectBtnHighlighted
										}
									><div className={styles.Icon}>💼</div>
										<span className={styles.catSpan}>Vacancies</span>
										
									</div>
									<div
										onClick={
											selector !== "Companies"
												? () => setSelector("Companies")
												: () => setSelector("")
										}
										// onMouseEnter={()=>{
										// 	setSelector("Companies")
										// }}
										className={
											selector !== "Companies"
												? styles.selectBtn
												: styles.selectBtnHighlighted
										}
									><div className={styles.Icon}>🏢</div>	
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
										// onMouseEnter={()=>{
										// 	setSelector("Items")
										// }}
										className={
											selector !== "Items"
												? styles.selectBtn
												: styles.selectBtnHighlighted
										}
									><div className={styles.Icon}>📦</div>
									<span className={styles.catSpan}>Items</span>
										
									</div>
									<div
										onClick={
											selector !== "Shops"
												? () => setSelector("Shops")
												: () => setSelector("")
										}
										// onMouseEnter={()=>{
										// 	setSelector("Shops")
										// }}
										className={
											selector !== "Shops"
												? styles.selectBtn
												: styles.selectBtnHighlighted
										}
									><div className={styles.Icon}>🏪</div>
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
