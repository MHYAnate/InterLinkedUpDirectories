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
  title: string;
  detail: string;
};

type companyId = {
	companyId: string;
	vendorId: String;
};

const FireBaseOffers: React.FC<companyId> = ({ companyId , vendorId  }) => {
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
			title: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});


  const [companyOffersDetails, setCompanyOffersDetails] = useState<Values[]>([]);

  const [isLoading, setIsLoading] = useState(true);

	const [offerSearchInput, setOfferSearchInput] = useState("");

	const [currentPage, setCurrentPage] = useState(1);

	const [postsPerPage] = useState(6);

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOfferSearchInput(event.target.value);
		// handleSuggestionClick;
	};

  useEffect(() => {
    const fetchCompamyOffers = async () => {
      setIsLoading(true);
      try {
        const companyOffersDetailRef = collection(database, 'Offers');
        const companyOffersQuery = query(companyOffersDetailRef, where('companyId', '==', companyId));

        const VendorOffersQuery = query(companyOffersDetailRef, where('vendorId', '==', vendorId));

        const querySnapshot = await getDocs(companyId !== ("" || null || undefined)?companyOffersQuery:VendorOffersQuery);

        if (querySnapshot.empty) {
          console.log('No profile details found');
          setCompanyOffersDetails([]);
        } else {
          const retrievedData: Values[] = [];
          querySnapshot.forEach((doc) => {
            const docData = doc.data() as Values;
            retrievedData.push(docData);
          });
          setCompanyOffersDetails(retrievedData);
        }
      } catch (error) {
        console.error('Error getting profile detail:', error);
        setCompanyOffersDetails([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompamyOffers();
  }, [companyId]);

	const items = companyOffersDetails;

	if (!items) return null;



	const filteredStaffName =
		items.length > 0
			? items.filter((eachItem) => {
					const text = eachItem.title.toLowerCase();
					return text.includes(offerSearchInput.toLowerCase());
			  })
			: [];

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredStaffName.slice(indexOfFirstPost, indexOfLastPost);

	// Change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);



	function RenderAvailableOffers() {
		if (filteredStaffName.length === 0) {
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
							placeholder="Search Title"
						/>
					</div>
				</div>
			</form>
			<div className={styles.renderAvModStockoverFlow}>
				<div className={styles.renderAvModStock}>
					{RenderAvailableOffers()}
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

FireBaseOffers.displayName = "FireBaseOffers";
export default FireBaseOffers;
