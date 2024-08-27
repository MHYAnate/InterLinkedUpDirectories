import * as React from "react";
import { useState, useCallback} from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import RateUs from "@/components/btn/rateUs";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import ShopModelItems from "./modelShopItemQ";
import CompanyModelVacancy from "./modelCompanyVacancyQ";
import ShopItemsComponent from "./fBIShopItem";
import CompanyVacanciesComponent from "./fBICompanyVacancy";



interface CompanyProps {
  companyName:string;
  id:any;
	companyPic:string;
  companyTag:string;
  about:string;
  address:string;
  phone:string;
  email:string;
}

interface FormValue {
  title:string;
}

 

const CompanyM: React.FC<CompanyProps> = (props:CompanyProps) => {

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
   			<div className={styles.shopName}>{props.companyName} </div>
				<div className={styles.shopNavBtnCover}>
				<div
					className={more !== `${props.id}` ? styles.btnShop : styles.btnShopA}
					onClick={
						more !== `${props.id}`
							? () => setMore(`${props.id}`)
							: () => setMore("")
					}
				>
					{more === `${props.id}` ? "Vacancies" : "Vacancies"}
				</div>
				<div
					className={more !== `${props.companyName}` ? styles.btnShop : styles.btnShopA}
					onClick={
						more !== `${props.companyName}`
							? () => setMore(`${props.companyName}`)
							: () => setMore("")
					}
				>
					{more === `${props.companyName}` ? "DETAILS" : "details"}
				</div>
				</div>
	
				<div className={more !== `${props.id}`?styles.companyBodyDivied : styles.hide}>
					<div className={styles.companyImgCover}>
						<Image
							className={styles.companyImg}
							src={`${props.companyPic}`}
							alt={`${props.companyName}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div>
					<div className={styles.showCompanyVacanciesTag}>
							<div className={styles.companyVacancyTitleAbtUS}> Company Tag</div>
							<div className={styles.companyVacancyDetail}>{props.companyTag}</div>
						</div>
					</div>
				{more === `${props.id}` ? <div className={styles.displayShopItemsFilter}>
				<div className={styles.searchShopImgCover}>
						<Image
							className={styles.searchShopImg}
							src={`${props.companyPic}`}
							alt={`${props.companyName}`}
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

				{more === `${props.id}` ? <div className={styles.displayShopItems}><CompanyModelVacancy companyName={props.companyName} value={shopSearchInput}/></div> : <></>}

				{more === `${props.companyName}` ?<div className={styles.displayShopItems}>
						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>About us</span>
							<span className={styles.companyVacancyDetailAbtUs}>{props.about} </span>
						</div>
						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Address</span>
							<span className={styles.companyVacancyDetailAbtUs}>{props.address} </span>
						</div>
						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Contact</span>
							<span className={styles.companyVacancyDetailAbtUs}>{props.phone} </span>
						</div>
						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Email</span>
							<span className={styles.companyVacancyDetailAbtUs}>{props.email} </span>
						</div>
				</div>:<></>}
				<div 
				onClick={() =>
					router.push(
						`/company/` +
							"?" +
							set(
								"companyName",
								`${props.companyName}`
							) 
						
					)
				}
				className={styles.enterShop}>{"Enter Company's Page"}</div>			
		</div>
	);
};

CompanyM.displayName = "CompanyM";
export default CompanyM;
