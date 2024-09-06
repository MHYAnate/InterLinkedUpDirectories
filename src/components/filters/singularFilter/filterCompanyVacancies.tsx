"use client";
import styles from "./styles.module.css";
import Pagination from "@/components/btn/paginationBtn";
import { useState, useEffect, useCallback, useTransition } from "react";
import { CompanyData } from "@/database/companyData";
import { useForm } from "react-hook-form";
import { VacancyType } from "@/database/vacancyType";

type CompanyVacancyValue = {
  title: string;
	type: string;
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
			type: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	

	const selectType = watch("type");

	const [shopSearchInput, setShopSearchInput] = useState("");

	const [isPending, startTransition] = useTransition();

	const [show, setShow] = useState("");

	const [more, setMore] = useState("");

	const [currentPage, setCurrentPage] = useState(1);

	const [postsPerPage] = useState(6);

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShopSearchInput(event.target.value);
		// handleSuggestionClick;
	};

	function renderAvailableVacancyType() {
		if (!VacancyType) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return VacancyType.map((vacancy) => (
			<option
				className={styles.renderCover}
				key={vacancy.id}
				value={vacancy.type}
			>
				{vacancy.type}
			</option>
		));
	}

	const items = CompanyData.find(
		(company) => company.companyName === `${companyName}`
	);

	if (!items) return null;
  const filteredListType= items.vacancies.length > 0 ?items.vacancies.filter((eachItem) => {
    const text = eachItem.type.toLowerCase();
    return (selectType !==(null || undefined|| "" || "Select Type")?text.includes(selectType.toLowerCase()):text );
  }):[];

	const filteredVacancyTitle =
		filteredListType.length > 0
			? filteredListType.filter((eachItem) => {
					const text = eachItem.jobTitle.toLowerCase();
					return text.includes(shopSearchInput.toLowerCase());
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

	function RenderAvailableModelVacancy() {
		if (filteredVacancyTitle.length === 0) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return (
				<div>
					<div>Nothing for Now, check Back Latter Hopefully</div>
				</div>
			);
		}

		return currentPosts?.map((vacancy) => (
			<div className={styles.VacancyRenderCover} key={vacancy.id}>
				<div className={styles.innerTextVacancyRenderCover}>
					<div className={styles.coverHeadDetail}>
						<div className={styles.detailType}>
							<span>{vacancy.type}</span>
							<div className={styles.headFootDetail}>
								<span className={styles.headFootSpan}>Salary</span>
								{vacancy.salary}
							</div>
						</div>
						<div className={styles.detailHead}>{vacancy.jobTitle}</div>

						<div className={styles.headFootDetailCover}>
							<div className={styles.headFootDetail}>
								<span className={styles.headFootSpan}>Opening</span>
								{vacancy.opening}
							</div>
							<div className={styles.headFootDetail}>
								<span className={styles.headFootSpan}>Closing</span>
								{vacancy.closing}
							</div>
						</div>
					</div>
					{/* <div className={styles.coverDetail}>
						<div className={styles.detailTitle}>Salary</div>
						<div className={styles.detail}>{vacancy.salary}</div>
					</div> */}

					<div className={styles.coverDetail}>
						<div className={styles.detailTitle}>Responsibilities</div>
						<div className={styles.detail}>{vacancy.responsibility}</div>
					</div>
					<div className={styles.coverDetail}>
						<div className={styles.detailTitle}>Qualification</div>

						<div className={styles.detail}>{vacancy.qualification}</div>
					</div>
					{/* {show ===`${vacancy.id}` && (<div  className={show ===`${vacancy.id}`?styles.dropDown: ""}>
            <div className={styles.headFootDetailCover}>
							<div className={styles.headFootDetail}><span className={styles.headFootSpan}>Opening</span>{vacancy.opening}</div>
							<div className={styles.headFootDetail}><span className={styles.headFootSpan}>Closing</span>{vacancy.closing}</div>
						</div>
								
						</div>)}	
						<div className={styles.vBtnCover}>
							<button className={show !==`${vacancy.id}`?styles.vBtn : styles.vBtn} onClick={show!==`${vacancy.id}`?()=> selectTab(`${vacancy.id}`):()=> selectTab("")}>{show===`${vacancy.id}`?"Show Less":"More Details"}</button>
						</div> */}
				</div>
			</div>
		));
	}

	return (
		<div className={styles.shopItemBodyCover}>
			<form className={styles.filter} onSubmit={handleSubmit(console.log)}>
				<div className={styles.selectGroup}>
					<div className={styles.selectCover}>
						<select
							value={
								selectType !== (undefined || null)
									? selectType
									: "Select Type"
							}
							className={styles.select}
							{...register("type")}
						>
							<option className={styles.option} value="Select Type">
								Select Job Type
							</option>
							{renderAvailableVacancyType()}
						</select>
					</div>

					<div className={styles.inputCover}>
						<input
							type="search"
							className={styles.input}
							{...register("title")}
							value={shopSearchInput}
							onChange={updateSearchInput}
							id="vendorAddress"
							placeholder="Search Job Title"
						/>
					</div>
				</div>
			</form>
			<div className={styles.renderAvModStockoverFlow}>
				<div className={styles.renderAvModVacancy}>
					{RenderAvailableModelVacancy()}
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

CompanyVacancyModel.displayName = "CompanyVacancyModel";
export default CompanyVacancyModel;
