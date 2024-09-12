"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./styles.module.css";
import { Suspense } from "react";
import Loading from "@/app/register/logo";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import {
	collection,
	setDoc,
	doc,
	getDocs,
	query,
	where,
	CollectionReference,
	onSnapshot,
	orderBy,
	limit,
	startAt,
	startAfter,
	endAt,
	endBefore,
	addDoc,
	serverTimestamp,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";

const { auth, storage, database } = Firebase;

interface RateUsProps {
	rateeId: string;
	raterId: string;
	raterName: string;
	raterImg: string;
}
interface RateValue {
	rating: string;
	rateeId: string;
  docid:string;
	rate: string;
	feedback: string;
	raterName: string;
	raterImg: string;
	raterId: string;
	createdAt:any;
}

type FormValue = {
	feedBack: string;
};

const RateUs: React.FC<RateUsProps> = ({
	rateeId,
	raterId,
	raterName,
	raterImg,
}) => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		getFieldState,
		formState: { isSubmitSuccessful, isDirty, isSubmitting },
	} = useForm<FormValue>({
		defaultValues: {
			feedBack: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const [profileDetails, setProfileDetails] = useState<RateValue[]>([]);

	const [totalRate, setTotalRate] = useState(Number);

	const rateUsDetailRef = collection(database, "rateUs");

	const rateeQuery = query(rateUsDetailRef, where("rateeId", "==", rateeId));

	const handleGetRatingDetails = async () => {
		try {
			const querySnapshot = await getDocs(rateeQuery);

			if (querySnapshot.empty) {
				console.log("No profile details found");
				return;
			}

			// const retrievedData = querySnapshot.docs[0].data() as RateValue;

      const retrievedData: RateValue[] = [];

      querySnapshot.forEach((doc) => {
				const docData = doc.data() as RateValue;
				retrievedData.push(docData);
			});

			const calculateTotalRate = (raters: RateValue[]) => {
				let total = 0;
				raters.forEach((rater: RateValue) => {
					total += parseInt(rater.rate);
				});
				return total;
			};
			calculateTotalRate;
			const totalRate = calculateTotalRate(retrievedData);
			setTotalRate(totalRate);
			console.log(`total rate ${totalRate}`);
			setProfileDetails(retrievedData);
		} catch (error) {
			console.error("Error getting profile detail:", error);
		}
	};

	useEffect(() => {
		handleGetRatingDetails();
	}, [handleGetRatingDetails]);

	const length = profileDetails?.length;

	const finalRate = Math.round(length ? totalRate / length : 0);

	const [rate, setRate] = useState(0);

	const [feedback, setFeedback] = useState("");

	const [openRateUs, setOpenRateUs] = useState(false);

	const [openFeedBack, setOpenFeedBack] = useState(false);

	const NewRate = async () => {
		const rateUsDetailRef = collection(database, "rateUs");

		try {
			const docRef = await addDoc(rateUsDetailRef, {
				rating: `${finalRate}`,
				rateeId: `${rateeId}`,
        docid: "",
				raterId: `${raterId}`,
				rate: `${rate}`,
				feedback: `${feedback}`,
				raterImg: `${raterImg}`,
				raterName: `${raterName}`,
				createdAt: serverTimestamp(),
			});
      const docId = docRef.id;

      await setDoc(
				doc(rateUsDetailRef, docId),
				{
					docid: docId,
				},
				{ merge: true }
			);
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
		setFeedback("");
	};
	

  const target = profileDetails.find(object => object.raterId === `${raterId}`)

  const upDateRate = async () => {
		const rateUsDetailRef = collection(database, "rateUs");
		try {
      await setDoc(doc(rateUsDetailRef, target?.docid), {
				rating: `${finalRate}`,
				rateeId: `${rateeId}`,
        docid: "",
				raterId: `${raterId}`,
				rate: `${rate}`,
				feedback: `${feedback}`,
				raterImg: `${raterImg}`,
				raterName: `${raterName}`,
			},{ merge: true });
      
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
		setFeedback("");
	};

  




	useEffect(() => {
		handleGetRatingDetails();
	}, [handleGetRatingDetails, NewRate, upDateRate]);

	function RenderAvailableFeedBacks() {
		if (profileDetails === null) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return profileDetails.map((rater) => (
			<div className={styles.feedBackCover} key={rater.raterId}>
				<div className={styles.feedBackImgCover}>
					<Image
						className={styles.feedBackImg}
						src={`${rater.raterImg}`}
						alt={`${rater.raterName}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
				</div>
				<div className={styles.feedBackDetailCover}>
					<div className={styles.feedBackDetails}>{rater.raterName}</div>
					<div className={styles.feedBackDetails}>
						{rater.rate}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="gold"
								viewBox="0 0 25 24"
								strokeWidth={1.5}
								stroke="gold"
								className={styles.svgSizeR}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
								/>
							</svg>
					</div>
					<div className={styles.feedBackDetails}>{rater.feedback}</div>
				</div>
			</div>
		));
	}

	return (
		<div className={styles.rateUsContainer}>
			<div className={styles.currentRate}>
				<div className={styles.rate}>
					<div className={styles.figure}>{`${finalRate}`}</div>
					<div className={styles.svgCover}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="gold"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="gold"
							className={styles.svgSize}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
							/>
						</svg>
					</div>
				</div>
				<div className={styles.view}>
					<div className={styles.figure}>{length}</div>
					<div className={styles.svgCover}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="grey"
							className={styles.svgSize}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
							/>
						</svg>
					</div>
				</div>
				<div
					onClick={() =>
						openRateUs ? setOpenRateUs(false) : setOpenRateUs(true)
					}
					className={styles.openRateUs}
				>
					<span> Rate</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="gold"
						viewBox="0 0 24 27"
						strokeWidth={1.5}
						stroke="gold"
						className={styles.svgSizeR}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
						/>
					</svg>
				</div>
			</div>

			{openRateUs && (
				<div className={styles.plsRateUs}>
					<p className={styles.rateExpTitle}>Please rate your experience:</p>
					<div className={styles.rateHolder}>
						{[1, 2, 3, 4, 5].map((star) => (
							<button
								key={star}
								onClick={() => setRate(star)}
								className={`${rate >= star ? styles.gold : styles.grey}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill={`${rate >= star ? "gold" : "none"}`}
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke={`${rate >= star ? "gold" : "silver"}`}
									className={styles.svgSize}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
									/>
								</svg>
							</button>
						))}
					</div>
					<form className={styles.form} onSubmit={handleSubmit(target?.rateeId === rateeId ? upDateRate : NewRate )}>
						<textarea
							{...register("feedBack", {})}
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
							placeholder="Leave your feedback"
							className={styles.feedbackInput}
						/>
						<button disabled={`${raterId}` === `${null || undefined}`} className={styles.rateBtn} type="submit">
							{`${raterId}` === `${null || undefined}`  ? `Register or logIn to Rate`:`Submit Rating`}
						</button>
					</form>
				</div>
			)}
			<button disabled={!raterId}
				onClick={() =>
					openFeedBack ? setOpenFeedBack(false) : setOpenFeedBack(true)
				}
				className={styles.feedBack}
			>
				{`${profileDetails?.length}` === `${null || undefined || 0}` ? `No FeedBack Available`:`${openFeedBack }` === `true`?`Hide FeedBacks`:`Show FeedBacks`}
			</button>
			<div className={openFeedBack ? styles.renderFeedBackBody : styles.hide}>
				{openFeedBack && RenderAvailableFeedBacks()}
			</div>
		</div>
	);
};

RateUs.displayName = "RateUs";
export default RateUs;

