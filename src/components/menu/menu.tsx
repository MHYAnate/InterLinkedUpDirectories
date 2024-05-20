import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import VidIntro from "../vidIntro/vidIntro";
import styles from "./styles.module.css";

interface CarouselProps {
	Services: {
		id: number;
		category: string;
		src: string;
		services: {
			id: number;
			name: string;
			src: string;
			link: string;
		}[];
	}[];
}

const Menu: React.FC<CarouselProps> = memo(({ Services }) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const set = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	return (
		<main className={styles.menuCover}>
			<div className={styles.menuBody}>
			<VidIntro/>
				<div
					className={styles.flexControl}
					onClick={() =>
						router.push(
							`/vendors` +
								"?" +
								set("name", `${Services[0]?.category}`) +
								"&" +
								set("src", `${Services[0]?.src}`)
						)
					}
				>
					<div className={styles.categoryCover}>
						<div className={styles.categoryImgCover}>
							<Image
								object-fit="cover"
								className={styles.categoryImg}
								alt="Picture of the author"
								quality={100}
								width={100}
								height={100}
								src={Services[0]?.src}
								priority={true}
								unoptimized
							/>
						</div>
						<div className={styles.categoryName}><div className={styles.flexCategoryName}>{Services[0]?.category}<span className={styles.span}> Service <span className={styles.bright}>Category</span></span></div></div>
					</div>
				</div>
				<div
					className={styles.flexControl}
					onClick={() =>
						router.push(
							`/vendors` +
								"?" +
								set("name", `${Services[1]?.category}`) +
								"&" +
								set("src", `${Services[1]?.src}`)
						)
					}
				>
					<div className={styles.categoryCover}>
						<div className={styles.categoryImgCover}>
							<Image
								object-fit="cover"
								className={styles.categoryImg}
								alt="Picture of the author"
								quality={100}
								width={100}
								height={100}
								src={Services[1]?.src}
								priority={true}
								unoptimized
							/>
						</div>
						<div className={styles.categoryName}><div className={styles.flexCategoryName}>{Services[1]?.category}<span className={styles.span}> Service <span className={styles.bright}>Category</span></span></div></div>
					</div>
				</div>
				<div
					className={styles.flexControl}
					onClick={() =>
						router.push(
							`/vendors` +
								"?" +
								set("name", `${Services[2]?.category}`) +
								"&" +
								set("src", `${Services[2]?.src}`)
						)
					}
				>
					<div className={styles.categoryCover}>
						<div className={styles.categoryImgCover}>
							<Image
								object-fit="cover"
								className={styles.categoryImgP}
								alt="Picture of the author"
								quality={100}
								width={100}
								height={100}
								src={Services[2]?.src}
								priority={true}
								unoptimized
							/>
						</div>
						<div className={styles.categoryName}><div className={styles.flexCategoryName}>{Services[2]?.category}<span className={styles.span}> Service <span className={styles.bright}>Category</span></span></div></div>
					</div>
				</div>
				<div
					className={styles.flexControl}
					onClick={() =>
						router.push(
							`/market`
						)
					}
				>
					<div className={styles.categoryCover}>
						<div className={styles.categoryImgCover}>
							<Image
								object-fit="cover"
								className={styles.categoryImg}
								alt="Picture of the author"
								quality={100}
								width={100}
								height={100}
								src="/service/commerce.jpg"
								priority={true}
								unoptimized
							/>
						</div>
						<div className={styles.categoryName}><div className={styles.flexCategoryName}>Markets</div></div>
					</div>
				</div>
				<div
					className={styles.flexControl}
					onClick={() =>
						router.push(
							`/vacancies`
						)
					}
				>
					<div className={styles.categoryCover}>
						<div className={styles.categoryImgCover}>
							<Image
								object-fit="cover"
								className={styles.categoryImg}
								alt="Picture of the author"
								quality={100}
								width={100}
								height={100}
								src="/service/vacancy.jpg"
								priority={true}
								unoptimized
							/>
						</div>
						<div className={styles.categoryName}><div className={styles.flexCategoryName}>Vacancies</div></div>
					</div>
				</div>
			</div>
		</main>
	);
});

export default Menu;
