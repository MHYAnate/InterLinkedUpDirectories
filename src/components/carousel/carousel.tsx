import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import Pagination from "@/components/btn/paginationBtn";

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

	const [currentPageA, setCurrentPageA] = useState(1);

	const [currentPageM, setCurrentPageM] = useState(1);

	const [currentPage, setCurrentPage] = useState(1);

	const [postsPerPage] = useState(7);

	const paginateA = (pageNumber: number) => setCurrentPageA(pageNumber);
	 
	const paginateM = (pageNumber: number) => setCurrentPageM(pageNumber);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

	useEffect(() => {
		if (
			Services[activeIndex].services[inneractiveIndex] ===
				(undefined || null) ||
			inneractiveIndex === (undefined || null)
		) {
			handleResetIndex();
			setInnerActiveIndex(1);
		}
	}, [Services[activeIndex].services[inneractiveIndex], inneractiveIndex]);

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
		(category) => category.category === "Others"
	);

	const servicesA = autoCategory ? autoCategory.services : [];

	const indexOfLastPostA = currentPageA * postsPerPage;
	const indexOfFirstPostA = indexOfLastPostA - postsPerPage;
	const currentPostsA = servicesA.slice(indexOfFirstPostA, indexOfLastPostA);

	function RenderAutomotiveServices() {
		if (!autoCategory) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return currentPostsA.map((service) => (
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

	const servicesM = maintenanceCategory ? maintenanceCategory.services : [];

	const indexOfLastPostM = currentPageM * postsPerPage;
	const indexOfFirstPostM = indexOfLastPostM - postsPerPage;
	const currentPostsM = servicesM.slice(indexOfFirstPostM, indexOfLastPostM);

	function RenderMaintenanceServices() {
		if (!maintenanceCategory) {
			return null;
		}

		return currentPostsM.map((service) => (
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

	const services = personalCategory ? personalCategory.services : [];

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = services.slice(indexOfFirstPost, indexOfLastPost);

	function RenderPersonalServices() {
		if (!personalCategory) {
			return null;
		}

		return currentPosts.map((service) => (
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

	useEffect(() => {
		if (automativeHover === false && maintainaceHover === false && peronalHover === false){
			setAutomativeHover(true);
		}
		},[]);

		useEffect(() => {
			activeIndex === 0 ?(setAutomativeHover(true), setPeronalHover(false)):activeIndex === 1?(setMaintainaceHover(true), setAutomativeHover(false)):activeIndex === 2?(setPeronalHover(true),setMaintainaceHover(false)):setAutomativeHover(true);
			},[activeIndex]);

			useEffect(() => {
			   automativeHover === true? setActiveIndex(0):maintainaceHover === true? setActiveIndex(1):peronalHover === true &&setActiveIndex(2);
				},[automativeHover,maintainaceHover, peronalHover]);

		useEffect(() => {
			const interval = setInterval(() => {
				if (automativeHover === false && maintainaceHover === false && peronalHover === false){
					activeIndex === 0 ?setAutomativeHover(true):activeIndex === 1?setMaintainaceHover(true):activeIndex === 2?setPeronalHover(true):activeIndex !== (0 ||1 ||2)?setAutomativeHover(true):setActiveIndex(0);
					
				}
			}, 10000);

			return () => clearInterval(interval);
		}, [intervalTime, handleNext,automativeHover, maintainaceHover, peronalHover, activeIndex]);

	return (
		<div className={styles.parent}>
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
						onClick={() => {
							setActiveIndex(0), setInnerActiveIndex(0);
						}}
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
						<span className={styles.catSpan}> {Services[0].category}</span>
					</div>
					<div
						onClick={() => {
							setActiveIndex(1), setInnerActiveIndex(0);
						}}
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
						<span className={styles.catSpan}> {Services[1].category}</span>
					</div>
					<div
						onClick={() => {
							setActiveIndex(2), setInnerActiveIndex(0);
						}}
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
						<span className={styles.catSpan}> {Services[2].category}</span>
					</div>
				</div>
				<div className={styles.mainBody}>
					<div className={styles.carouselImageCover}>
						{automativeHover === true && (
							<div
							onMouseLeave={() => setAutomativeHover(false)}
							 className={styles.hover}>
								<div
									
									className={styles.flexRenderCoverControl}
								>
									{RenderAutomotiveServices()}
								</div>
								<div className={styles.carouselPagi}>
									<Pagination
										postsPerPage={postsPerPage}
										totalPosts={servicesA.length}
										paginate={paginateA}
										currentpage={currentPageA}
									/>
								</div>
							</div>
						)}
						{maintainaceHover === true && (
							<div
							onMouseLeave={() => setMaintainaceHover(false)}
							 className={styles.hover}>
								<div
									
									className={styles.flexRenderCoverControl}
								>
									{RenderMaintenanceServices()}
								</div>
								<div className={styles.carouselPagi}>
									<Pagination
										postsPerPage={postsPerPage}
										totalPosts={servicesM.length}
										paginate={paginateM}
										currentpage={currentPageM}
									/>
								</div>
							</div>
						)}
						{peronalHover === true && (
							<div
							onMouseLeave={() => setPeronalHover(false)}
							 className={styles.hover}>
								<div
									
									className={styles.flexRenderCoverControl}
								>
									{RenderPersonalServices()}
								</div>
								<div className={styles.carouselPagi}>
									<Pagination
										postsPerPage={postsPerPage}
										totalPosts={services.length}
										paginate={paginate}
										currentpage={currentPage}
									/>
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
								src={
									Services[activeIndex]?.services[inneractiveIndex]?.src
										? Services[activeIndex]?.services[inneractiveIndex]?.src
										: "/service/select.jpg"
								}
								priority={true}
								unoptimized
							/>
						</div>
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
							className={styles.serviceDetailCover}
						>
							<div className={styles.serviceDetail}>
								<span className={styles.titleTopSpan}>
									{Services[activeIndex]?.services[inneractiveIndex]?.name}
									{" Service"}
								</span>
								<div>
									{Services[activeIndex]?.services[inneractiveIndex]?.src && (
										<div
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
											<div className={styles.enterBtn}>
												{"ENTER"}

												<Image
													object-fit="cover"
													className={styles.imgSlideEnter}
													alt="Picture of the author"
													quality={100}
													width={100}
													height={100}
													// fill
													src={
														Services[activeIndex]?.services[inneractiveIndex]
															?.src
															? Services[activeIndex]?.services[
																	inneractiveIndex
															  ]?.src
															: "/service/select.jpg"
													}
													priority={true}
													unoptimized
												/>
											</div>
											{/* <svg
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
										</svg> */}
										</div>
									)}
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
												<div className={styles.pre}>Previous</div>
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
												<div className={styles.Nex}>Next</div>
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
