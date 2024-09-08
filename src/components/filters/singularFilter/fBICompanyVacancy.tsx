import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useForm } from "react-hook-form";
import Image from 'next/image';
import styles from './styles.module.css'; // Adjust the import path as needed
import firebase from "@/firebase/firebase";
const { auth, storage, database, clientColRef, add, getClientDoc, Delete } =
	firebase;

// Define the type for your shop item data
interface FormValue {
  jobTitle: string;
  responsibility: string;
  qualification: string;
  title: string;
  salary: string;
  opening: string;
  closing: string;
  type: string;
  companyId: string;
  tag: any;
  id:any;
}

interface CompaniesVacanciesProps {
  companyId: string;
  value: any;
  tag: any;
}
const CompanyVacanciesComponent: React.FC<CompaniesVacanciesProps> = ({ companyId, value,tag }) => {
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
	} = useForm<FormValue>({
		defaultValues: {
			title: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

  const [companyVacanciesDetails, setCompanyVacanciesDetails] = useState<FormValue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyVacancies = async () => {
      setIsLoading(true);
      try {
        const companyVacancyDetailRef = collection(database, 'Company');
        const companyVacancyQuery = query(companyVacancyDetailRef, where('companyId', '==', companyId));
        const querySnapshot = await getDocs(companyVacancyQuery);

        if (querySnapshot.empty) {
          console.log('No profile details found');
          setCompanyVacanciesDetails([]);
        } else {
          const retrievedData: FormValue[] = [];
          querySnapshot.forEach((doc) => {
            const docData = doc.data() as FormValue;
            retrievedData.push(docData);
          });
          setCompanyVacanciesDetails(retrievedData);
        }
      } catch (error) {
        console.error('Error getting profile detail:', error);
        setCompanyVacanciesDetails([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyVacancies();
  }, [companyId]);

  if (isLoading) return <div>Loading...</div>; // Handle loading state

  const filteredCompanyVacancyTag = companyVacanciesDetails?.filter((eachItem) => {
		const text = eachItem.tag.toLowerCase();
		return text.includes(tag.toLowerCase());
	});

	const filteredCompanyVacancyName = filteredCompanyVacancyTag.filter((eachItem) => {
		const text = eachItem.title.toLowerCase();
		return text.includes(value.toLowerCase());
	});

  return (
    <div className={styles.displayShopItems}>
      {companyVacanciesDetails.length > 0 ? (
        filteredCompanyVacancyName.map((vacancy) => (
<div className={styles.renderCover} key={vacancy.companyId}>
				<div className={styles.showCompanyVacanciesT}>
					
						<div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyDetailT}>{vacancy.jobTitle}</span>
						</div>
						<div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyDetail}>{vacancy.salary}</span>
						</div>
					
				</div>
				{show === `${vacancy.companyId}` && (
					<div className={styles.showCompanyVacancies}>
            <div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyTitle}>Responsibility</span>
							<span className={styles.companyVacancyDetail}>{vacancy.responsibility}</span>
						</div>
						<div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyTitle}>Qualification</span>
							<span className={styles.companyVacancyDetail}>{vacancy.qualification}</span>
						</div>

						<div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyTitle}>Openning Date</span>
							<span className={styles.companyVacancyDetail}>{vacancy.opening}</span>
						</div>
						<div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyTitle}>Clossing Date</span>
							<span className={styles.companyVacancyDetail}>{vacancy.closing}</span>
						</div>				
					</div>
				)}
				<div
					className={show !== `${vacancy.companyId}` ? styles.vShowbtn : styles.vShowbtn}
					onClick={
						show !== `${vacancy.companyId}`
							? () => setShow(`${vacancy.companyId}`)
							: () => setShow("")
					}
				>
					{show === `${vacancy.companyId}` ? "Less" : "Details"}
				</div>
			</div>
        ))
      ) : (
        <div>Search Somewhere else</div> // Handle empty state
      )}
    </div>
  );
};


CompanyVacanciesComponent.displayName = "CompanyVacanciesComponent";

export default CompanyVacanciesComponent;
