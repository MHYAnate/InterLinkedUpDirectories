"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Services } from "@/database/data";
import Nav from "@/components/nav/mainNav/nav";
import Loader from "@/components/load/load";
import { Suspense } from "react";
import Loading from "../register/logo";
import styles from "./styles.module.css";
import Vendor from "./vendor";
import User from "./user";

Services;

export default function Register() {
	const [loader, setLoader] = useState(false);

	const [isVendorTab, setIsVendorTab] = useState("vendor");

	return (
		<Suspense fallback={<Loading />}>
			<>
				{loader ? (
					<Loader />
				) : (
					<div className={styles.Main}>
						<nav className={styles.navHolder}>
							<Nav setQNav={setIsVendorTab} qNav="" />
						</nav>
						<div className={styles.formContainer}>
							<div className={styles.titleCover}>
								<div className={styles.categoryCover}>
									<div className={styles.categoryImgCover}>
										<Image
											object-fit="cover"
											className={styles.categoryImg}
											alt="Picture of the author"
											quality={100}
											width={100}
											height={100}
											src="/service/register.jpg"
											priority={true}
											unoptimized
										/>
									</div>
									<div className={styles.title}>
										<div className={styles.flextitle}></div>
									</div>
								</div>
							</div>
							<div className={styles.formCover}>
								<div className={styles.topSelect}>
									<div
										onClick={() => setIsVendorTab("user")}
										className={
											isVendorTab === "user"
												? styles.topSelectBtnLeftSelected
												: styles.topSelectBtnLeft
										}
									>
										<span className={styles.tsSpan}>Register as User</span>
									</div>
									<div
										onClick={() => setIsVendorTab("vendor")}
										className={
											isVendorTab === "vendor"
												? styles.topSelectBtnRightSelected
												: styles.topSelectBtnRight
										}
									>
										<span className={styles.tsSpan}>Register as Vendor</span>
									</div>
								</div>
								{isVendorTab === "vendor" && <Vendor state={setLoader} />}
								{isVendorTab === "user" && <User state={setLoader} />}
							</div>
						</div>
					</div>
				)}
			</>
		</Suspense>
	);
}
