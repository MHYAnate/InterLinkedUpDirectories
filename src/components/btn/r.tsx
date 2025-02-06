// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import Image from "next/image";
// import {
// 	collection,
// 	setDoc,
// 	doc,
// 	getDocs,
// 	query,
// 	where,
// 	addDoc,
// 	serverTimestamp,
// } from "firebase/firestore";
// import { useForm } from "react-hook-form";
// import Firebase from "@/firebase/firebase";


// const { database } = Firebase;

// interface RateUsProps {
// 	rateeId: string;
// 	raterId: string;
// 	raterName: string;
// 	raterImg: string;
// 	setRateDetails: any;
// }

// interface RateValue {
// 	rating: string;
// 	rateeId: string;
// 	docid: string;
// 	rate: string;
// 	feedback: string;
// 	raterName: string;
// 	raterImg: string;
// 	raterId: string;
// 	createdAt: any;
// }

// type FormValue = {
// 	feedback: string;
// };

// const RateUs: React.FC<RateUsProps> = ({
// 	rateeId,
// 	raterId,
// 	raterName,
// 	raterImg,
// 	setRateDetails,
// }) => {
  
// 	const { register, handleSubmit, reset } = useForm<FormValue>();
// 	const [profileDetails, setProfileDetails] = useState<RateValue[]>([]);
// 	const [totalRate, setTotalRate] = useState(0);
// 	const [rate, setRate] = useState(0);
// 	const [feedback, setFeedback] = useState("");
// 	const [openRateUs, setOpenRateUs] = useState(false);
// 	const [openFeedBack, setOpenFeedBack] = useState(false);

// 	const handleGetRatingDetails = useCallback(async () => {
// 		const rateUsDetailRef = collection(database, "rateUs");
// 		const rateeQuery = query(rateUsDetailRef, where("rateeId", "==", rateeId));

// 		try {
// 			const querySnapshot = await getDocs(rateeQuery);
// 			if (!querySnapshot.empty) {
// 				const retrievedData: RateValue[] = querySnapshot.docs.map(
// 					(doc) => doc.data() as RateValue
// 				);
// 				const totalRate = retrievedData.reduce(
// 					(total, rater) => total + parseInt(rater.rate),
// 					0
// 				);
// 				setTotalRate(totalRate);
// 				setProfileDetails(retrievedData);
// 				setRateDetails(retrievedData);
// 			}
// 		} catch (error) {
// 			console.error("Error getting profile detail:", error);
// 		}
// 	}, [rateeId]);

// 	useEffect(() => {
// 		handleGetRatingDetails();
// 	}, [handleGetRatingDetails]);

// 	const finalRate = Math.round(
// 		profileDetails.length ? totalRate / profileDetails.length : 0
// 	);

// 	const handleNewRate = async (data: FormValue) => {
// 		const rateUsDetailRef = collection(database, "rateUs");
// 		try {
// 			const docRef = await addDoc(rateUsDetailRef, {
// 				rating: `${finalRate}`,
// 				rateeId,
// 				docid: "",
// 				raterId,
// 				rate: `${rate}`,
// 				feedback: data.feedback,
// 				raterImg,
// 				raterName,
// 				createdAt: serverTimestamp(),
// 			});
// 			await setDoc(
// 				doc(rateUsDetailRef, docRef.id),
// 				{ docid: docRef.id },
// 				{ merge: true }
// 			);
// 			reset();
// 			setRate(0);
// 			handleGetRatingDetails();
// 		} catch (error) {
// 			console.error("Error adding profile detail:", error);
// 		}
// 	};

// 	const handleUpdateRate = async (data: FormValue) => {
// 		const target = profileDetails.find((object) => object.raterId === raterId);
// 		if (target) {
// 			const rateUsDetailRef = collection(database, "rateUs");
// 			try {
// 				await setDoc(
// 					doc(rateUsDetailRef, target.docid),
// 					{
// 						rating: `${finalRate}`,
// 						rateeId,
// 						rate: `${rate}`,
// 						feedback: data.feedback,
// 						raterImg,
// 						raterName,
// 					},
// 					{ merge: true }
// 				);
// 				reset();
// 				setRate(0);
// 				handleGetRatingDetails();
// 			} catch (error) {
// 				console.error("Error updating profile detail:", error);
// 			}
// 		}
// 	};

// 	return (
// 		<div className="space-y-4">
// 			<div className="flex items-center space-x-4">
// 				<div className="flex items-center">
// 					<span className="text-2xl font-bold">{finalRate}</span>
// 					<svg
// 						xmlns="http://www.w3.org/2000/svg"
// 						fill="gold"
// 						viewBox="0 0 24 24"
// 						stroke="gold"
// 						className="w-6 h-6"
// 					>
// 						<path
// 							strokeLinecap="round"
// 							strokeLinejoin="round"
// 							d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
// 						/>
// 					</svg>
// 				</div>
// 				<span className="text-gray-500">({profileDetails.length} reviews)</span>
// 				<button
// 					onClick={() => setOpenRateUs(!openRateUs)}
// 					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
// 				>
// 					Rate
// 				</button>
// 			</div>

// 			{openRateUs && (
// 				<div className="space-y-4">
// 					<p className="font-semibold">Please rate your experience:</p>
// 					<div className="flex space-x-2">
// 						{[1, 2, 3, 4, 5].map((star) => (
// 							<button
// 								key={star}
// 								onClick={() => setRate(star)}
// 								className={`focus:outline-none ${
// 									rate >= star ? "text-yellow-400" : "text-gray-300"
// 								}`}
// 							>
// 								<svg
// 									xmlns="http://www.w3.org/2000/svg"
// 									fill="currentColor"
// 									viewBox="0 0 24 24"
// 									stroke="currentColor"
// 									className="w-8 h-8"
// 								>
// 									<path
// 										strokeLinecap="round"
// 										strokeLinejoin="round"
// 										d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
// 									/>
// 								</svg>
// 							</button>
// 						))}
// 					</div>
// 					<form
// 						onSubmit={handleSubmit(
// 							profileDetails.some((p) => p.raterId === raterId)
// 								? handleUpdateRate
// 								: handleNewRate
// 						)}
// 						className="space-y-4"
// 					>
// 						<textarea
// 							{...register("feedback")}
// 							placeholder="Leave your feedback"
// 							className="w-full p-2 border rounded"
// 						/>
// 						<button
// 							type="submit"
// 							disabled={!raterId}
// 							className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:bg-gray-300"
// 						>
// 							{!raterId ? "Register or log in to rate" : "Submit Rating"}
// 						</button>
// 					</form>
// 				</div>
// 			)}

// 			<button
// 				onClick={() => setOpenFeedBack(!openFeedBack)}
// 				className="text-blue-500 hover:underline"
// 				disabled={!raterId || profileDetails.length === 0}
// 			>
// 				{profileDetails.length === 0
// 					? "No Feedback Available"
// 					: openFeedBack
// 					? "Hide Feedbacks"
// 					: "Show Feedbacks"}
// 			</button>

// 			{openFeedBack && (
// 				<div className="space-y-4">
// 					{profileDetails.map((rater) => (
// 						<div
// 							key={rater.raterId}
// 							className="flex items-start space-x-4 p-4 bg-gray-100 rounded"
// 						>
// 							<Image
// 								src={rater.raterImg}
// 								alt={rater.raterName}
// 								width={50}
// 								height={50}
// 								className="rounded-full"
// 							/>
// 							<div>
// 								<p className="font-semibold">{rater.raterName}</p>
// 								<div className="flex items-center">
// 									<span>{rater.rate}</span>
// 									<svg
// 										xmlns="http://www.w3.org/2000/svg"
// 										fill="gold"
// 										viewBox="0 0 24 24"
// 										stroke="gold"
// 										className="w-4 h-4 ml-1"
// 									>
// 										<path
// 											strokeLinecap="round"
// 											strokeLinejoin="round"
// 											d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
// 										/>
// 									</svg>
// 								</div>
// 								<p className="text-gray-600">{rater.feedback}</p>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default RateUs;
