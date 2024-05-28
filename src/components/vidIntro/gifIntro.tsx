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

const GifIntro =() => {
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
		<main className={styles.menuUserCover}>
			<div className={styles.menuUserBody}>
				<div
					className={styles.flexUserControl}
				>
					<div className={styles.categoryUserCover}>
						<div className={styles.categoryUserImgCover}>
              <div className={styles.imgUserPositioner}>
							<Image
										object-fit="cover"
										className={styles.vidUser}
										alt="Picture of the author"
										quality={100}
										width={100}
										height={100}
										src="/service/header.gif"
										priority={true}
										unoptimized
									/>
              </div>	
						</div>
						<div className={styles.categoryUserName}><div className={styles.flexCategoryUserName}>
              <div className={styles.h1User}>InterLinked 	Up Directories</div>
              <p>Global Linkage to Services, Goods and ,Vacancies, tailored to meet your individual Needs.</p>
							</div></div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default GifIntro;
