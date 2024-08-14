"use client";
import styles from "./styles.module.css";
import Pagination from "@/components/btn/paginationBtn";
import { useState, useEffect, useCallback, useTransition } from "react";
import { CompanyData } from "@/database/companyData";
import { useForm } from "react-hook-form";
import Image from "next/image";

type CompanyVacancyValue = {
  title: string;

};

type CompanyName = {
	companyName: string;
};

const CompanyVacancyModel: React.FC<CompanyName> = ({ companyName }) => {
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
	} = useForm<CompanyVacancyValue>({
		defaultValues: {
      title: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const [staffSearchInput, setStaffSearchInput] = useState("");

	const [currentPage, setCurrentPage] = useState(1);

	const [postsPerPage] = useState(3);

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStaffSearchInput(event.target.value);
		// handleSuggestionClick;
	};

	const items = CompanyData.find(
		(company) => company.companyName === `${companyName}`
	);

	if (!items) return null;
 

	const filteredStaffName =
		items.staffs.length > 0
			? items.staffs.filter((eachItem) => {
					const text = eachItem.name.toLowerCase();
					return text.includes(staffSearchInput.toLowerCase());
			  })
			: [];

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredStaffName.slice(
		indexOfFirstPost,
		indexOfLastPost
	);

	// Change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	function RenderAvailableModelStaffs() {
		if (filteredStaffName.length === 0) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return (
				<div>
					<div>No One Found</div>
				</div>
			);
		}

		return currentPosts?.map((staff) => (
			<div className={styles.stockRenderCover} key={staff.id}>
			<div className={styles.stockName}></div>
			<div className={styles.stockSeperatorCover}>
				<div className={styles.imgCover}>
					<Image
						className={styles.idiImg}
						src={ `${staff.src}`}
						alt={`${staff.name}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
				</div>
			</div>
				<div className={styles.showMore}>
				<div className={styles.innerTextShowMoreRenderCover}>
				<div className={styles.contactCover}>
					<div className={styles.contactTitle}></div>
					<div className={styles.contact}>{staff.name}</div>
				</div>
				<div className={styles.contactCover}>
					<div className={styles.contactTitle}>Position</div>
					<div className={styles.contact}>{staff.rank}</div>
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
							value={staffSearchInput}
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
					totalPosts={filteredStaffName.length}
					paginate={paginate}
					currentpage={currentPage}
				/>
			</div>
		</div>
	);
};

CompanyVacancyModel.displayName = "CompanyVacancyModel";
export default CompanyVacancyModel;
