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

export default function Home() {
	
	useEffect(() => {
		window.location.pathname;
	});

	const pathname = usePathname();

	const [selector, setSelector] = useState("Items");

	return (
		<main
			className={`${styles.link} ${
				pathname === "/register" ? styles.regNavBodyCover : styles.Main
			}`}
		>
			<nav className={styles.navHolder}>
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
										className={
											selector !== "vacancies"
												? styles.selectBtn
												: styles.selectBtnHighlighted
										}
									>
										Vacancies
									</div>
									<div
										onClick={
											selector !== "Companies"
												? () => setSelector("Companies")
												: () => setSelector("")
										}
										className={
											selector !== "Companies"
												? styles.selectBtn
												: styles.selectBtnHighlighted
										}
									>
										Companies
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
										className={
											selector !== "Items"
												? styles.selectBtn
												: styles.selectBtnHighlighted
										}
									>
										Items
									</div>
									<div
										onClick={
											selector !== "Shops"
												? () => setSelector("Shops")
												: () => setSelector("")
										}
										className={
											selector !== "Shops"
												? styles.selectBtn
												: styles.selectBtnHighlighted
										}
									>
										Shops
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
