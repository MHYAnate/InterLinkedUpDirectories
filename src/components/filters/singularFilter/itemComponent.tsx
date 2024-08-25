import * as React from "react";
import { useState, useEffect, useCallback, useTransition, useRef } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import RateUs from "@/components/btn/rateUs";
import { useRouter, useSearchParams } from "next/navigation";


interface ItemProps {
    title:string;
    image:string;
    image2:string;
    id:string | Number;
    price:string;
    status:string;
    features:string;
    condition:string;
    phone:string;
    address:string;
    docid:string | undefined;
    name:string | undefined;
    src:string | undefined;
}

 

const Item: React.FC<ItemProps> = (props:ItemProps) => {

  const router = useRouter();

  const [more, setMore] = useState("");

  const [img, setImg] = useState("");

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
							src={
								img === `${props.image}`
									? `${props.image}`
									: img === `${props.image2}`
									? `${props.image2}`
									: `${props.image}`
							}
							alt={`${props.title}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
						<div className={styles.picSelCover}>
						<div className={styles.picSel}>
						<div
							className={img === `${props.image}` ? styles.picHL : styles.picL}
							onClick={() => {
								setImg(`${props.image}`);
							}}
						>
							{`FRONT`}
						</div>
						<div
							className={img === `${props.image2}` ? styles.picHR : styles.picR}
							onClick={() => {
								setImg(`${props.image2}`);
							}}
						>
							{`SIDE`}
						</div>
					</div>
					</div>
					</div>
					<div>
						<RateUs
							rateeId={`${props.id}`}
							raterId={`${props?.docid}`}
							raterName={`${props?.name}`}
							raterImg={`${props?.src}`}
						/>
					</div>
					{more !== `${props.id}` && (
						<div className={styles.innerTextStockRenderCover}>
							<div className={styles.contactCover}>
								<div className={styles.contactTitle}>price</div>
								<div className={styles.contact}>{props.price}</div>
							</div>
						</div>
					)}
				</div>
				{more === `${props.id}` && (
					<div className={styles.showMore}>
						<div className={styles.innerTextShowMoreRenderCover}>
							<div className={styles.status}>{props.status}</div>
							<div className={styles.contactCover}>
								<div className={styles.contactTitle}>price</div>
								<div className={styles.contact}>{props.price}</div>
							</div>
							<div className={styles.contactCover}>
								<div className={styles.contactTitle}>features</div>
								<div className={styles.contact}>{props.features}</div>
							</div>
							<div className={styles.contactCover}>
								<div className={styles.contactTitle}>Condition</div>
								<div className={styles.contact}>{props.condition}</div>
							</div>
              {props.phone !== `` && <div className={styles.contactCover}>
								<div className={styles.contactTitle}>Contact</div>
								<div className={styles.contact}>{props.phone}</div>
							</div> }
							{props.address !== `` && <div className={styles.contactCover}>
								<div className={styles.contactTitle}>Address</div>
								<div className={styles.address}>{props.address}</div>
							</div> }
							
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
			
		</div>
	);
};

Item.displayName = "Item";
export default Item;
