"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import HeroCarousel from "./heroCarousel";

interface Props {
	setQNav: (value: string) => void;
	qNav: string;
}

export default function Hero({ setQNav, qNav }: Props) {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<div className={styles.formContainer}>
			<div>
				<div className={styles.titleCover}>
					<div className={styles.categoryCover}>
						<div className={styles.catFlex}>
							<div className={styles.flexControl}>
								<div>
									<HeroCarousel setQNav={setQNav} qNav={qNav} />
								</div>
								<div className={styles.title}>
									<div className={styles.flextitle}>
										<div className={styles.header}>
										
												<div className={styles.biz}>BUSINESS</div>
												
											
											{/* <div className={styles.titleHero}>
												C<span className={styles.age}>ONNEC</span>
												<span className={styles.age1}>TIONS</span>
											</div> */}
											<div className={styles.titleHero2}>
												<span className={styles.toWhat}>MADE</span>{" "}
												<span className={styles.matters}>Easy</span>
											</div>

											<div className={styles.titleHero3}>
												<span className={styles.titleend}>
													A    
												</span>
												<span className={styles.titleend1}> Simplified</span>
												<span className={styles.titleend2}> Business</span>
												<span className={styles.titleend3}>  Network</span>
												<span className={styles.titleend4}>  with</span>
												<span className={styles.titleend5}>  an</span>
												<span className={styles.titleend6}>  Amplified</span>
												<span className={styles.titleend7}> Reach.</span>
											</div>

											<div className={styles.callToAction}>
												<div
													onClick={() => router.push("/register")}
													className={styles.registerBtn}
												>
													{"Register Now!"}
												</div>
											</div>
										</div>
									</div>
									<div
										onClick={()=>{qNav !== "features"?setQNav("features"): setQNav("")}}
										className={styles.arrow}
									>
										<svg
											className="w-2 h-2"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 14l-7 7m0 0l-7-7m7 7V3"
											></path>
										</svg>
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
