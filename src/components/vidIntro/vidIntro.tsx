import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../nav/mainNav/logo";
import { useSearchParams } from "next/navigation";

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

const VidIntro =() => {
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
				<div
					className={styles.flexControl}
				
				>
					<div className={styles.categoryCover}>
						<div className={styles.categoryImgCover}>
              <div className={styles.imgPositioner}>
              <video className={styles.vid} src="/video/intro8.webm" width="100%" height="auto" autoPlay muted loop ></video>
              </div>
             
							
						</div>
						<div className={styles.categoryName}><div className={styles.flexCategoryName}>
              <div className={styles.h1}>InterLinked 	Up Directories</div>
              <p>Global Linkage to Services, Goods and ,Vacancies, tailored to meet your individual Needs.</p>
							</div></div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default VidIntro;
