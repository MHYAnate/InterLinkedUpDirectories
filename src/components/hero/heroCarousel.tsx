"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Cards } from "@/database/carouselData";
import styles from "./styles.module.css";

interface Props {
	setQNav: (value: string) => void;
	qNav: string;
}

export default function HeroCarousel({ setQNav, qNav }: Props) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const nextSlide = useCallback(() => {
		if (!isTransitioning) {
			setIsTransitioning(true);
			setCurrentIndex((prevIndex) => (prevIndex + 1) % Cards.length);
			setTimeout(() => setIsTransitioning(false), 500);
		}
	}, [isTransitioning]);

	useEffect(() => {
		const intervalId = setInterval(nextSlide, 4000);
		return () => clearInterval(intervalId);
	}, [nextSlide]);

	return (
		<div className={styles.heroCarouselCover}>
			<div className={styles.heroCarouselBody}>
				<Image
					src={"/white.gif"}
					alt={"nill"}
					// layout="fill"
					// objectFit="cover"
					height={400}
					width={400}
					className={styles.carouselImage}
				/>
				{/* <div className={styles.heroCarousel}>
          {Cards.map((card, index) => (
            <div
              key={index}
              className={index === currentIndex? styles.carouselCardCover1:styles.carouselCardCover2}
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className={styles.carouselBody}>
                
                <div className={styles.carouselImageCover}>
                  <Image
                    src={card.image}
                    alt={"nill"}
                    // layout="fill"
                    // objectFit="cover"
                    height={400}
                    width={400}
                    className={styles.carouselImage}
                  />
                  <div className={styles.carouselImageFix}></div>
                </div>
          
              </div>
            </div>
          ))}
        </div> */}
			</div>
		</div>
	);
}
