import * as React from "react";
import { useState} from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { ShopData } from "@/database/shopData";


interface ShopModelItemsProps {
 shopName:string;
 value:string;
}

 

const ShopModelItems: React.FC<ShopModelItemsProps> = ({shopName, value}) => {

  
	const [show, setShow] = useState("");

  function shopItems(shopName: string) {

		const items = ShopData.find((shop) => shop.name === `${shopName}`);

		if (!items) return null;


	const filteredShopItemsName =  items?.items.filter((eachItem) => {
		const text = eachItem.title.toLowerCase();
		return text.includes(value.toLowerCase());
	});

		return filteredShopItemsName?.map((item) => (
			<div className={styles.renderCover} key={item.id}>
				<div className={styles.shopItemsCover}>
					<div className={styles.shopsItemsImgCover}>
						<Image
							className={styles.shopItemImg}
							src={`${item.image}`}
							alt={`${item.title}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div>
					<div className={styles.shopItemsDetailCover}>
						<div className={styles.shopItemsDetailTitleName}>{item.title}</div>
						<div className={styles.shopItemsBody}>{item.price}</div>
					</div>
				</div>
				{show === `${item.id}` && (
					<div className={styles.showMoreDetails}>
						<div className={styles.shopsItemsImgCover}>
						<Image
							className={styles.shopItemImg}
							src={`${item.image2}`}
							alt={`${item.title}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div>
						<div className={styles.showMoreDetailCover}>
							<div className={styles.showMoreItemsDetailsBody}>
							<span className={styles.shopItemsDetailTitle}>Condition</span>
							<span className={styles.shopItemsBody}>{item.condition}</span>
						</div>
						<div  className={styles.showMoreItemsDetailsBody}>
							<span className={styles.shopItemsDetailTitle}>Status</span>
							<span className={styles.shopItemsBody}>{item.status}</span>
						</div>
						<div  className={styles.showMoreItemsDetailsBody}>
							<span className={styles.shopItemsDetailTitle}>feature</span>
							<span className={styles.shopItemsBody}>{item.features}</span>
						</div>
					</div>
						
					</div>
				)}
				<div
					className={show !== `${item.id}` ? styles.qShopbtn : styles.qShopbtn}
					onClick={
						show !== `${item.id}`
							? () => setShow(`${item.id}`)
							: () => setShow("")
					}
				>
					{show === `${item.id}` ? "Less" : "Details"}
				</div>
			</div>
		));
	}



	return (
		<div>
			{shopItems(shopName)}			
		</div>
	);
};

ShopModelItems.displayName = "ShopModelItems";
export default ShopModelItems;
