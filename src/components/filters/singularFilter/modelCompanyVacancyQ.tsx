import * as React from "react";
import { useState} from "react";
import styles from "./styles.module.css";
import { CompanyData } from "@/database/companyData";


interface CompanyModelVacancyProps {
 companyName:string;
 value:string;
}

 

const CompanyModelVacancy: React.FC<CompanyModelVacancyProps> = ({companyName, value}) => {

  
	const [show, setShow] = useState("");

  function CompanyVacancy(companyName: string) {

		const items = CompanyData.find((Company) => Company.companyName === `${companyName}`);

		if (!items) return null;


	const filteredCompanyVacancyName =  items?.vacancies.filter((eachItem) => {
		const text = eachItem.jobTitle.toLowerCase();
		return text.includes(value.toLowerCase());
	});

		return filteredCompanyVacancyName?.map((vacancy) => (
			<div className={styles.renderCover} key={vacancy.id}>
				<div className={styles.showCompanyVacancies}>
					
						<div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyTitle}>Job Title</span>
							<span className={styles.companyVacancyDetail}>{vacancy.jobTitle}</span>
						</div>
						<div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyTitle}>Salary</span>
							<span className={styles.companyVacancyDetail}>{vacancy.salary}</span>
						</div>
					
				</div>
				{show === `${vacancy.id}` && (
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
					className={show !== `${vacancy.id}` ? styles.vShowbtn : styles.vShowbtn}
					onClick={
						show !== `${vacancy.id}`
							? () => setShow(`${vacancy.id}`)
							: () => setShow("")
					}
				>
					{show === `${vacancy.id}` ? "Less" : "Details"}
				</div>
			</div>
		));
	}

	return (
		<div>
			{CompanyVacancy(companyName)}			
		</div>
	);
};

CompanyModelVacancy.displayName = "CompanyModelVacancy";
export default CompanyModelVacancy;
