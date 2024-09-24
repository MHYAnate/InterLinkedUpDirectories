"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
import styles from "./styles.module.css";



export default function Hero() {

	const pathname = usePathname();
	const router = useRouter()
	
	return (
		<div className={styles.formContainer}>
			<div >
				<div className={styles.titleCover}>
					<div className={styles.categoryCover}>
						<div className={styles.catFlex}>
							<div className={styles.flexControl}>
						<div className={styles.categoryImgCover}>
							<Image
								object-fit="cover"
								className={styles.categoryImg}
								alt="Picture of the author"
								quality={100}
								width={100}
								height={100}
								src="/service/b7.jpg"
								priority={true}
								unoptimized
							/>
						</div>
						<div className={styles.title}>
							<div className={styles.flextitle}>
								<div className={styles.header}>
									<div className={styles.titleHero}>C<span className={styles.age}>ONNECTIONS</span> 
									</div>
									<div className={styles.titleHero2}>
									 <span className={styles.toWhat}>MADE</span> <span className={styles.matters}>Easy</span>
									</div>
									<div className={styles.callToAction}>
										<div onClick={()=>router.push('/register')} className={styles.registerBtn}>
											{"Register Now!"}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
}
