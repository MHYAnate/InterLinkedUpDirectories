import * as React from "react";
import { useState, useCallback} from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import RateUs from "@/components/btn/rateUs";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import ShopModelItems from "./modelShopItemQ";
import ShopItemsComponent from "./fBIShopItem";



interface ShopProps {
  shopName:string;
  id:any;
  shopPic:string;
  docid:string | undefined;
  name:string | undefined;
  src:string | undefined;
  shopTag:string;
  market:string;
  address:string;
  phone:string;
  email:string;
  offers:string;
  check: any;
  value:any;
	namei:string;
}

interface FormValue {
  title:string;
}

 

const Shop: React.FC<ShopProps> = (props:ShopProps) => {

  const {
		register,
		formState: {
		},
	} = useForm<FormValue>({
		defaultValues: {
			title: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

  const [shopSearchInput, setShopSearchInput] = useState("");

  const updateShopItemSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShopSearchInput(event.target.value);
		// handleSuggestionClick;
	};
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
  const [more, setMore] = useState("");

	

	return (
		<div className={styles.shopRenderCover}>
      <div className={styles.shopName}>{props.shopName} </div>
				<div className={styles.shopNavBtnCover}>
				<div
					className={more !== `${props.id}` ? styles.btnShop : styles.btnShopA}
					onClick={
						more !== `${props.id}`
							? () => setMore(`${props.id}`)
							: () => setMore("")
					}
				>
					{more === `${props.id}` ? "STOCKS" : "stocks"}
				</div>
				<div
					className={more !== `${props.shopName}` ? styles.btnShop : styles.btnShopA}
					onClick={
						more !== `${props.shopName}`
							? () => setMore(`${props.shopName}`)
							: () => setMore("")
					}
				>
					{more === `${props.shopName}` ? "DETAILS" : "details"}
				</div>
				</div>
	
				<div className={more !== `${props.id}`?styles.companyBodyDivied : styles.hide}>
					<div className={styles.shopImgCover}>
						<Image
							className={styles.shopImg}
							src={`${props.shopPic}`}
							alt={`${props.shopName}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div>
					<div>
						<RateUs rateeId={`${props.id}`} raterId={`${props?.docid}`} raterName={`${props?.name}`} raterImg={`${props?.src}`} />
					</div>
					<div className={styles.showCompanyVacanciesTag}>
							<div className={styles.companyVacancyTitleAbtUS}> Shop Tag</div>
							<div className={styles.companyVacancyDetail}>{props.shopTag}</div>
						</div>
					
				</div>
				{more === `${props.id}` ? <div className={styles.displayShopItemsFilter}>
				<div className={styles.searchShopImgCover}>
						<Image
							className={styles.searchShopImg}
							src={`${props.shopPic}`}
							alt={`${props.shopName}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div><form>
					<div className={styles.shopItemInputCover}>
						<input
							type="search"
							className={styles.shopItemInput}
							{...register("title")}
							value={shopSearchInput}
							onChange={updateShopItemSearchInput}
							id="vendorAddress"
							placeholder="Name of Item"
						/>
					</div>
					</form>
				</div> : <></>}

				{more === `${props.id}` ? <div className={styles.displayShopItems}>{props.check !==(undefined || null || 0)?<ShopItemsComponent shopId={props.id} value={shopSearchInput}/>:<ShopModelItems shopName={props.namei} value={shopSearchInput}/>} </div> : <></>}

				{more === `${props.shopName}` ?<div className={styles.displayShopItems}>

				<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Market</span>
							<span className={styles.shopVacancyDetailAbtUs}>{props.market} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Address</span>
							<span className={styles.shopVacancyDetailAbtUs}>{props.address} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Owner</span>
							<span className={styles.shopVacancyDetailAbtUs}>{props.namei} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Contact</span>
							<span className={styles.shopVacancyDetailAbtUs}>{props.phone} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Email</span>
							<span className={styles.shopVacancyDetailAbtUs}>{props.email} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Offer</span>
							<span className={styles.shopVacancyDetailAbtUs}>{props.offers} </span>
						</div>

						
				</div>:<></>}
				<div 
			onClick={() =>
        router.push(
          `/shop/` +
            "?" +
            set(
              "shopName",
              `${props.shopName}`
            ) +
            "&" +
            set(
              "shopId",
              `${props.id}`
            )
            
        )
      }
				className={styles.enterShop}>Enter Shop</div>			
		</div>
	);
};

Shop.displayName = "Shop";
export default Shop;
