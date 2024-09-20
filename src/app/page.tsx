"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import Carousel from "@/components/carousel/carousel";
import { Services } from "@/database/data";
import Menu from "@/components/menu/menu";
import NewsLetter from "@/components/newsLetter/newsLetter";
import Nav from "@/components/nav/mainNav/nav";
import { useEffect, useState } from "react";
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
import 'intersection-observer';


export default function Home() {
	
	useEffect(() => {
		window.location.pathname;
	});

	const pathname = usePathname();

	const [selector, setSelector] = useState("Items");

	const [intersector, setIntersector] = useState(false);

	useEffect(() => {
    // Check if `IntersectionObserver` is supported (it won't be on the server)
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const targetElement = document.getElementById('target-element');

      if (targetElement) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (entry.intersectionRatio >= 0.7) {
								setIntersector(true);
							}
							
            }
          });
					
        },{
					root: null,
					rootMargin: "0px",
					threshold: [0.0, 1],
				});

        observer.observe(targetElement);
        
        // Cleanup the observer when component is unmounted
        return () => observer.disconnect();
      }
    } else {
      console.warn('IntersectionObserver is not supported');
    }
  }, []);

	return (
		<main
			className={`${styles.link} ${
				pathname === "/register" ? styles.regNavBodyCover : styles.Main
			}`}
		>
			<nav id='target-element' className={styles.navHolder}>
				<Nav />
			</nav>
			<div className={styles.body}>
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
