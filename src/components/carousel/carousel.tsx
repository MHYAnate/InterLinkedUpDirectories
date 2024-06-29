import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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

const Carousel: React.FC<CarouselProps> = memo(({ Services }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [inneractiveIndex, setInnerActiveIndex] = useState(0);
	const [automativeHover, setAutomativeHover] = useState(false);
	const [maintainaceHover, setMaintainaceHover] = useState(false);
	const [peronalHover, setPeronalHover] = useState(false);

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

	const handleNext = useCallback(() => {
		setActiveIndex((prevIndex) =>
			prevIndex === Services.length - 1 ? 0 : prevIndex + 1
		);
	}, [setActiveIndex, Services.length]);

	const handleResetIndex = useCallback(() => {
		setInnerActiveIndex(1);
	}, [setActiveIndex, Services.length]);

	const inhandleNext = useCallback(() => {
		setInnerActiveIndex((prevIndex) =>
			prevIndex === Services[activeIndex].services.length - 1
				? 0
				: prevIndex + 1
		);
	}, [setInnerActiveIndex, Services, activeIndex]);

	useEffect(()=>{
		if(Services[activeIndex].services[inneractiveIndex] === (undefined || null) || inneractiveIndex === (undefined || null)){
			handleResetIndex();
			setInnerActiveIndex(1);
		}
	},[Services[activeIndex].services[inneractiveIndex], inneractiveIndex]);

	const inhandleprev = useCallback(() => {
		setInnerActiveIndex((prevIndex) =>
			prevIndex === Services[activeIndex].services.length - 1
				? 0
				: prevIndex - 1
		);
	}, [setInnerActiveIndex, Services, activeIndex]);

	const intervalTime = useMemo(() => {
		return 10000 * Services[activeIndex].services.length - 1;
	}, [activeIndex, Services]);

	const inIntervalTime = useMemo(() => {
		return 10000;
	}, []);

	const serviceImage = useMemo(() => {
		return Services[activeIndex].services[inneractiveIndex]?.src;
	}, [activeIndex, inneractiveIndex, Services]);

	const serviceTitle = useMemo(() => {
		return Services[activeIndex].services[inneractiveIndex]?.name;
	}, [activeIndex, inneractiveIndex, Services]);

	useEffect(() => {
		const interval = setInterval(() => {
			handleNext();
		}, intervalTime);

		return () => clearInterval(interval);
	}, [intervalTime, handleNext]);

	useEffect(() => {
		const interval = setInterval(() => {
			inhandleNext();
		}, inIntervalTime);

		return () => clearInterval(interval);
	}, [inIntervalTime, inhandleNext, serviceTitle, serviceImage]);



	const autoCategory = Services.find(
		(category) => category.category === "Automotive"
	);

	const maintenanceCategory = Services.find(
		(category) => category.category === "Maintenance"
	);

	const personalCategory = Services.find(
		(category) => category.category === "Personal"
	);

	function RenderAutomotiveServices() {
		if (!autoCategory) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return autoCategory.services.map((service) => (
			<div
				onClick={() => (
					setActiveIndex(0),
					setInnerActiveIndex(service.id - 1),
					setAutomativeHover(false)
				)}
				className={styles.renderCover}
				key={service.id}
			>
				<Image
					className={styles.imgHover}
					src={service.src}
					alt={service.name}
					width={500}
					height={500}
					unoptimized
				/>
				<p className={styles.sname}>{service.name}</p>
			</div>
		));
	}

	function RenderMaintenanceServices() {
		if (!maintenanceCategory) {
			return null;
		}

		return maintenanceCategory.services.map((service) => (
			<div
				onClick={() => (
					setActiveIndex(1),
					setInnerActiveIndex(service.id - 1),
					setMaintainaceHover(false)
				)}
				className={styles.renderCover}
				key={service.id}
			>
				<Image
					className={styles.imgHover}
					src={service.src}
					alt={service.name}
					width={500}
					height={500}
					unoptimized
				/>
				<p className={styles.sname}>{service.name}</p>
			</div>
		));
	}

	function RenderPersonalServices() {
		if (!personalCategory) {
			return null;
		}

		return personalCategory.services.map((service) => (
			<div
				onClick={() => (
					setActiveIndex(2),
					setInnerActiveIndex(service.id - 1),
					setPeronalHover(false)
				)}
				className={styles.renderCover}
				key={service.id}
			>
				<Image
					className={styles.imgHover}
					src={service.src}
					alt={service.name}
					width={500}
					height={500}
					unoptimized
				/>
				<p className={styles.sname}>{service.name}</p>
			</div>
		));
	}

	return (
		<div className={styles.parent}>
			<div className={styles.topSelect}>
				<div
					onClick={() => router.push("/market")}
					className={styles.topSelectBtnLeft}
				>
					<span className={styles.tsSpan}>Market</span>
				</div>
				<div
					onClick={() => router.push("/vacancies")}
					className={styles.topSelectBtnRight}
				>
					<span className={styles.tsSpan}>Vacancies</span>
				</div>
			</div>
			<div
				onMouseLeave={() => {
					setAutomativeHover(false);
					setMaintainaceHover(false);
					setPeronalHover(false);
				}}
				className={styles.mainCard}
			>
				<div className={styles.titleBodyCategorySelector}>
					<div
						onClick={() => setActiveIndex(0)}
						className={
							Services[activeIndex].category === Services[0].category
								? styles.highLighted
								: styles.unHighLighted
						}
						onMouseEnter={() => {
							setMaintainaceHover(false);
							setPeronalHover(false);
							setAutomativeHover(true);
						}}
					>
						<span className={styles.catSpan}>
							{" "}
							{Services[0].category} Service Category
						</span>
					</div>
					<div
						onClick={() => setActiveIndex(1)}
						className={
							Services[activeIndex].category === Services[1].category
								? styles.highLighted
								: styles.unHighLighted
						}
						onMouseEnter={() => {
							setPeronalHover(false);
							setAutomativeHover(false);
							setMaintainaceHover(true);
						}}
					>
						<span className={styles.catSpan}>
							{" "}
							{Services[1].category} Service Category
						</span>
					</div>
					<div
						onClick={() => setActiveIndex(2)}
						className={
							Services[activeIndex].category === Services[2].category
								? styles.highLighted
								: styles.unHighLighted
						}
						onMouseEnter={() => {
							setAutomativeHover(false);
							setMaintainaceHover(false);
							setPeronalHover(true);
						}}
					>
						<span className={styles.catSpan}>
							{" "}
							{Services[2].category} Service Category
						</span>
					</div>
				</div>
				<div className={styles.mainBody}>
					<div className={styles.carouselImageCover}>
						{automativeHover === true && (
							<div className={styles.hover}>
								<div
									onMouseLeave={() => setAutomativeHover(false)}
									className={styles.flexRenderCoverControl}
								>
									{RenderAutomotiveServices()}
								</div>
							</div>
						)}
						{maintainaceHover === true && (
							<div className={styles.hover}>
								<div
									onMouseLeave={() => setMaintainaceHover(false)}
									className={styles.flexRenderCoverControl}
								>
									{RenderMaintenanceServices()}
								</div>
							</div>
						)}
						{peronalHover === true && (
							<div className={styles.hover}>
								<div
									onMouseLeave={() => setPeronalHover(false)}
									className={styles.flexRenderCoverControl}
								>
									{RenderPersonalServices()}
								</div>
							</div>
						)}
						<div
							onClick={() =>
								router.push(
									`/vendors/${Services[activeIndex]?.services[inneractiveIndex]?.name}` +
										"?" +
										set(
											"name",
											`${Services[activeIndex]?.services[inneractiveIndex]?.name}`
										) +
										"&" +
										set(
											"isrc",
											`${Services[activeIndex]?.services[inneractiveIndex]?.src}`
										) +
										"&" +
										set(
											"name",
											`${Services[activeIndex]?.services[inneractiveIndex]?.name}`
										)
								)
							}
							className={styles.slider}
						>
							<Image
								object-fit="cover"
								className={styles.imgSlide}
								alt="Picture of the author"
								quality={100}
								width={100}
								height={100}
								src={Services[activeIndex]?.services[inneractiveIndex]?.src ? Services[activeIndex]?.services[inneractiveIndex]?.src :'/service/select.jpg'}
								priority={true}
								unoptimized
							/>
						</div>
						<div className={styles.serviceDetailCover}>
							<div className={styles.serviceDetail}>
								<span className={styles.titleTopSpan}>
									{Services[activeIndex]?.services[inneractiveIndex]?.name}
									{" Service"}
								</span>
								<div>
									{Services[activeIndex]?.services[inneractiveIndex]?.src && (<div
										className={styles.linkUpTxt}
										onClick={() =>
											router.push(
												`/vendors/${Services[activeIndex]?.services[inneractiveIndex]?.name}` +
													"?" +
													set(
														"name",
														`${Services[activeIndex]?.services[inneractiveIndex]?.name}`
													) +
													"&" +
													set(
														"isrc",
														`${Services[activeIndex]?.services[inneractiveIndex]?.src}`
													) +
													"&" +
													set(
														"name",
														`${Services[activeIndex]?.services[inneractiveIndex]?.name}`
													)
											)
										}
									>
										{"ENTER"}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1}
											stroke="currentColor"
											className="size-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
											/>
										</svg>
									</div>)}
									
								</div>
							</div>
						</div>
						<div className={styles.vendorNav}>
							<div className={styles.vendorNavHolder}>
								<div
									onClick={() =>
										setInnerActiveIndex((prevIndex) =>
											prevIndex === Services[activeIndex].services.length - 1
												? 0
												: prevIndex - 1
										)
									}
									className={styles.prev}
								>
									{Services[activeIndex]?.services[inneractiveIndex - 1]
										?.name && (
										<>
											<div className={styles.positioner}>
												<div>Previous</div>
												{
													Services[activeIndex]?.services[inneractiveIndex - 1]
														?.name
												}
											</div>
											<div className={styles.imgCover}>
												<Image
													object-fit="cover"
													className={styles.img}
													alt="/load.jpg"
													quality={100}
													width={100}
													height={100}
													src={
														Services[activeIndex]?.services[
															inneractiveIndex - 1
														]?.src
													}
													priority={true}
													unoptimized
												/>
											</div>
										</>
									)}
								</div>
								<div
									onClick={() =>
										setInnerActiveIndex((prevIndex) =>
											prevIndex === Services[activeIndex].services.length - 1
												? 0
												: prevIndex + 1
										)
									}
									className={styles.next}
								>
									{Services[activeIndex]?.services[inneractiveIndex + 1]
										?.name && (
										<>
											<div className={styles.positioner}>
												<div>Next</div>
												{
													Services[activeIndex]?.services[inneractiveIndex + 1]
														?.name
												}
											</div>
											<div className={styles.imgCover}>
												<Image
													object-fit="cover"
													className={styles.img}
													alt="Picture of the author"
													quality={100}
													width={100}
													height={100}
													src={
														Services[activeIndex]?.services[
															inneractiveIndex + 1
														]?.src
													}
													priority={true}
													unoptimized
												/>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
Carousel.displayName = "Carousel";
export default Carousel;
