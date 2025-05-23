import * as React from "react";
import { useState, useEffect, useCallback, useTransition, useRef } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import RateUs from "@/components/btn/rateUs";
import { useRouter, useSearchParams } from "next/navigation";
import ViewBtn from "@/components/btn/viewPicSvg";
import CloseViewBtn from "@/components/btn/viewPicSvgC";

interface ItemProps {
	title: string;
	image: string;
	image2: string;
	id: string | Number;
	price: string;
	status: string;
	features: string;
	condition: string;
	phone: string;
	address: string;
	docid: string | undefined;
	name: string | undefined;
	src: string | undefined;
}

const Item: React.FC<ItemProps> = (props: ItemProps) => {
	const router = useRouter();

	const [more, setMore] = useState("");

	const [img, setImg] = useState("");

	const [view, setView] = useState(false);

	const [isPending, startTransition] = useTransition();

	const searchParams = useSearchParams();

	const set = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	function selectTab(nextTab: string) {
		startTransition(() => {
			setMore(nextTab);
		});
	}

	return (
		<div className={styles.stockRenderCover}>
			<div className={styles.stockName}>{props.title}</div>
			<div className={styles.stockSeperatorCover}>
				<div className={styles.imgCover}>
					<Image
						className={styles.idiImg}
						src={`${props.image}`}
						alt={`${props.title}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
					<div className={styles.condition}>
						<div>{props.condition}</div>
					</div>
					<div className={styles.picSelCover}>
						<div
							onClick={() => {
								setView(true);
							}}
							className={styles.picSel}
						>
							<ViewBtn />
						</div>
					</div>
				</div>
				<div></div>
				{more !== `${props.id}` && (
					<div className={styles.innerTextStockRenderCover}>
						<div className={styles.contactCover}>
							<div className={styles.price}>{props.price}</div>
						</div>
					</div>
				)}
			</div>
			{more === `${props.id}` ? (
				<RateUs
					rateeId={`${props.id}`}
					raterId={`${props?.docid}`}
					raterName={`${props?.name}`}
					raterImg={`${props?.src}`}
				/>
			) : (
				<></>
			)}
			{more === `${props.id}` && (
				<div className={styles.showMore}>
					<div className={styles.innerTextShowMoreRenderCover}>
						<div className={styles.status}>{props.status}</div>
						<div className={styles.contactCover}>
							<div className={styles.price}>{props.price}</div>
						</div>
						<div className={styles.contactCover}>
							<div className={styles.contact}>{props.features}</div>
						</div>
						{props.phone !== `` && (
							<div className={styles.contactCover}>
								<div className={styles.contactTitle}>Contact</div>
								<div className={styles.contact}>{props.phone}</div>
							</div>
						)}
						{props.address !== `` && (
							<div className={styles.contactCover}>
								<div className={styles.contactTitle}>Address</div>
								<div className={styles.address}>{props.address}</div>
							</div>
						)}
					</div>
				</div>
			)}
			<button
				className={more !== `${props.id}` ? styles.btn : styles.btnA}
				onClick={
					more !== `${props.id}`
						? () => selectTab(`${props.id}`)
						: () => selectTab("")
				}
			>
				{more === `${props.id}` ? "Less" : "More Details"}
			</button>
			{view && (
				<div className={styles.mainViewCover}>
					<div className={styles.mainView}>
						<div onClick={() => setView(false)}>
							<CloseViewBtn />
						</div>
						<div className={styles.idiImgVCover}>
							<Image
								className={styles.idiImgV}
								src={
									img === "1"
										? `${props.image}`
										: img === "2"
										? `${props.image2}`
										: `${props.image}`
								}
								alt={`${props.title}`}
								quality={100}
								width={500}
								height={500}
								// unoptimized
							/>
						</div>
						<div className={styles.selectViewPicture}>
							<div
								className={img === "1" ? styles.picHL : styles.picL}
								onClick={() => {
									setImg("1");
								}}
							>
								front
							</div>
							<div
								className={img === "2" ? styles.picHR : styles.picR}
								onClick={() => setImg("2")}
							>
								side
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

Item.displayName = "Item";
export default Item;
