"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import { ShopData } from "@/database/shopData";
import Pagination from "@/components/btn/paginationBtn";
import { useState, useEffect, useCallback, useTransition } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { VacancyType } from "@/database/vacancyType";
import { useForm } from "react-hook-form";
import firebase from "@/firebase/firebase";
const { auth, storage, database, clientColRef, add, getClientDoc, Delete } =
	firebase;

type Values = {
	id: string;
  src: string;
  name: string;
  rank: string;
};

type companyId = {
	companyId: string;
	vendorId: String;
};

const FireBaseStaff: React.FC<companyId> = ({ companyId , vendorId }) => {
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
	} = useForm<Values>({
		defaultValues: {
			name: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});


  const [companyStaffsDetails, setCompanyStaffsDetails] = useState<Values[]>([]);

  const [isLoading, setIsLoading] = useState(true);

	const [staffSearchInput, setStaffSearchInput] = useState("");

	const [currentPage, setCurrentPage] = useState(1);

	const [postsPerPage] = useState(3);

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStaffSearchInput(event.target.value);
		// handleSuggestionClick;
	};

  useEffect(() => {
    const fetchCompamyStaffs = async () => {
      setIsLoading(true);
      try {
        const companyStaffDetailRef = collection(database, 'Staffs');
			
        const companyStaffQuery = query(companyStaffDetailRef, where('companyId', '==', companyId));

				const vendorStaffQuery = query(companyStaffDetailRef, where('vendorId', '==', vendorId));
        const querySnapshot = await getDocs(companyId !== ("" || null || undefined)?companyStaffQuery:vendorStaffQuery);

        if (querySnapshot.empty) {
          console.log('No profile details found');
          setCompanyStaffsDetails([]);
        } else {
          const retrievedData: Values[] = [];
          querySnapshot.forEach((doc) => {
            const docData = doc.data() as Values;
            retrievedData.push(docData);
          });
          setCompanyStaffsDetails(retrievedData);
        }
      } catch (error) {
        console.error('Error getting profile detail:', error);
        setCompanyStaffsDetails([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompamyStaffs();
  }, [companyId]);

	const items = companyStaffsDetails;

	if (!items) return null;



	const filteredStaffName =
		items.length > 0
			? items.filter((eachItem) => {
					const text = eachItem.name.toLowerCase();
					return text.includes(staffSearchInput.toLowerCase());
			  })
			: [];

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredStaffName.slice(indexOfFirstPost, indexOfLastPost);

	// Change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);



	function RenderAvailableStaffs() {
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
			<div className={styles.stockName}>{staff.name}</div>
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
							{...register("name")}
							value={staffSearchInput}
							onChange={updateSearchInput}
							id="vendorAddress"
							placeholder="Search Name"
						/>
					</div>
				</div>
			</form>
			<div className={styles.renderAvModStockoverFlow}>
				<div className={styles.renderAvModStock}>
					{RenderAvailableStaffs()}
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

FireBaseStaff.displayName = "FireBaseStaff";
export default FireBaseStaff;
