"use client";
import styles from "./styles.module.css";
import Pagination from "@/components/btn/paginationBtn";
import { useState, useEffect, useCallback, useTransition } from "react";
import { CompanyData } from "@/database/companyData";
import { useForm } from "react-hook-form";
import Image from "next/image";

type CompanyOfferValue = {
	id: string;
  src: string;
  title: string;
  detail: string;
};

type CompanyName = {
	companyName: string;
};

const CompanyOfferModel: React.FC<CompanyName> = ({ companyName }) => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		unregister,
		setFocus,
		setValue,
		control,
		formState: {
			isSubmitSuccessful,
			errors,
			isSubmitted,
			isSubmitting,
			isDirty,
			isValid,
		},
	} = useForm<CompanyOfferValue>({
		defaultValues: {
      title: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const [offerSearchInput, setOfferSearchInput] = useState("");

	const [currentPage, setCurrentPage] = useState(1);

	const [postsPerPage] = useState(3);

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOfferSearchInput(event.target.value);
		// handleSuggestionClick;
	};

	const items = CompanyData.find(
		(company) => company.companyName === `${companyName}`
	);

	if (!items) return null;
 

	const filteredVacancyTitle =
		items.offers.length > 0
			? items.offers.filter((eachItem) => {
					const text = eachItem.title.toLowerCase();
					return text.includes(offerSearchInput.toLowerCase());
			  })
			: [];

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredVacancyTitle.slice(
		indexOfFirstPost,
		indexOfLastPost
	);

	// Change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	function RenderAvailableModelStaffs() {
		if (filteredVacancyTitle.length === 0) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return (
				<div>
					<div>No One Found</div>
				</div>
			);
		}

		return currentPosts?.map((offer) => (
			<div className={styles.stockRenderCover} key={offer.id}>
			<div className={styles.stockName}>{offer.title}</div>
      {offer.src?	<div className={styles.stockSeperatorCover}>
				<div className={styles.imgCover}>
					<Image
						className={styles.idiImg}
						src={ `${offer.src}`}
						alt={`${offer.title}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
				</div>
			</div>: <></>}
				<div className={styles.showMoreOffer}>
				<div className={styles.innerTextShowMoreRenderCover}>
        <div className={styles.contactCover}>
					<div className={styles.contactTitle}>Detail</div>
					<div className={styles.contact}>{offer.detail}</div>
				</div>
				</div>
			</div>
		</div>
		));
	}

	return (
		<div className={styles.shopItemBodyCover}>
			<form className={styles.filter} onSubmit={handleSubmit(console.log)}>
				<div className={styles.selectGroup}>
					<div className={styles.inputCover}>
						<input
							type="search"
							className={styles.input}
							{...register("title")}
							value={offerSearchInput}
							onChange={updateSearchInput}
							id="vendorAddress"
							placeholder="Search Job Title"
						/>
					</div>
				</div>
			</form>
			<div className={styles.renderAvModStockoverFlow}>
				<div className={styles.renderAvModStock}>
					{RenderAvailableModelStaffs()}
				</div>
			</div>

			<div className={styles.renderAvModpagi}>
				<Pagination
					postsPerPage={postsPerPage}
					totalPosts={filteredVacancyTitle.length}
					paginate={paginate}
					currentpage={currentPage}
				/>
			</div>
		</div>
	);
};

CompanyOfferModel.displayName = "CompanyOfferModel";
export default CompanyOfferModel;