import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { StateData } from "@/database/stateData";
import { VendorsData } from "@/database/vendorData";
import styles from "./styles.module.css";
import { Services } from "@/database/data";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


type FormValue = {
	vaddress: string;
};

export default function FilterVendorsCategory() {
	const {
		register,
		handleSubmit,
	} = useForm<FormValue>({
		defaultValues: {
			vaddress: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const [searchInput, setSearchInput] = useState("");

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

	const ServiceCategory = searchParams.get("name");

	const Category = Services.find(
		(category) => category.category === `${ServiceCategory}`
	);

	const filteredList = Category?.services.filter((eachItem) => {
		const text = eachItem.name.toLowerCase();
		return text.includes(searchInput);
	});

	function RenderAvailableVendorsCategory() {
		if (!Services) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return filteredList?.map((service) => (
			<div
			onClick={
				()=>(router.push(`/vendors/${service.name}` + '?' + set('name' , `${service.name}`)+'&'+ set('isrc',`${service.src}`)))
			 } 
				className={styles.VendorRenderCoverC}
				key={service.id}
			>
				<div className={styles.imgCoverC}>
					<div className={styles.vendorName}>{service.name}</div>
					<Image
						className={styles.idiImgC}
						src={`${service.src}`}
						alt={`${service.name}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
				</div>
			</div>
		));
	}

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
		// handleSuggestionClick;
	};

	return (
		<div className={styles.filterBodyCover}>
			<form className={styles.filterC}>
				<div className={styles.selectGroupC}>
					<div className={styles.inputCoverC}>
						<input
							type="search"
							className={styles.inputC}
							{...register("vaddress", {
								pattern: {
									value: /[A-Za-z]/,
									message: `Name Required`,
								},
							})}
							value={searchInput}
							onChange={updateSearchInput}
							id="vendorAddress"
							placeholder="Quick Search"
						/>
					</div>
				</div>
			</form>
			<div className={styles.displayFilterC}>
					<div className={styles.renderVendorInnerCoverC}>
						{RenderAvailableVendorsCategory()}
					</div>
			</div>
		</div>
	);
}
